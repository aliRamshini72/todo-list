import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {SortType, TodoModel, TodoStatusEnum} from '../models/todo.model';
import {Utility} from '../utils/Utility';


export interface State {
    todoList: TodoModel[],
    sortType: SortType
}

export interface Action {
    add: (item: Pick<TodoModel, 'label' | 'desc'>) => void,
    remove: (id: string) => void,
    complete: (id: string, status: TodoStatusEnum) => void
    sort: () => void,
    deleteCompleted: () => void,
    updateList : (list: TodoModel[]) => void
}

export interface Store extends State, Action {
}

export const initialState: State = {
    todoList: [],
    sortType: SortType.ASC
};

export const actions = (set: any): Action => {
    const add = (item: Pick<TodoModel , 'label' | 'desc'>) => {
        const date = new Date().getTime();
        const id = Utility.generateUniqueId();
        const newItem = {...item, createAt: date, id, status: TodoStatusEnum.ACTIVE} as TodoModel;
        set((state: State) => {
            if (state.sortType === SortType.ASC) return {...state, todoList: [...state.todoList, newItem]}
            return {...state, todoList: [newItem, ...state.todoList]}
        }, false, 'add_todo')
    }

    const remove = (id: string) => {
        set((state: State) => {
            return {...state, todoList: state.todoList.filter(item => item.id !== id)}
        }, false, 'remove_todo')
    }

    const complete = (id: string, status: TodoStatusEnum) => {
        set((state: State) => {
            const newList = state.todoList.map((el) => {
                if (el.id === id) {
                    return {...el, status};
                }
                return el;
            })
            return {...state, todoList: newList}
        }, false, 'complete_todo')
    }
    const deleteCompleted = () => {
        set((state: State) => {
            return {...state, todoList: state.todoList.filter(i => i.status !== TodoStatusEnum.COMPLETED)};
        }, false, 'remove_completed')
    }
    const sort = () => {
        set((state: State) => {
            const newList = [...state.todoList];
            newList.sort((a, b) => {
                if (state.sortType === SortType.DESC)
                    return a.createAt - b.createAt
                return b.createAt - a.createAt
            })
            return {sortType: state.sortType === SortType.DESC ? SortType.ASC : SortType.DESC, todoList: newList}
        }, false, 'sort_todo')
    }

    const updateList = (list: TodoModel[]) => {
        set((state: State) => {
                return {todoList: list}
        }, false, 'drag_drop_todo')
    }

    return {add, remove, complete, deleteCompleted, sort , updateList}

};

export const useTodoStore = create<Store>()(
    devtools(
        immer(
            persist(
                (set) => ({
                    ...initialState,
                    ...actions(set),
                }),
                {
                    name: 'TODO.STORE',
                    storage: createJSONStorage(() => sessionStorage),
                }
            )
        ),
        {
            name: 'TODO.STORE',
        }
    )
);
