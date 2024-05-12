import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { TodoModel, TodoStatusEnum } from '../models/todo.model';
import { SortType } from '../hooks/useTodoList';
import { Utility } from '../utils/Utility';



export interface State {
    todoList: TodoModel[],
    sortType: SortType
}

export interface Action {
    add: (item: Pick<TodoModel, 'label' | 'desc'>) => void,
    remove: (id: string) => void,
    complete: (id: string, status: TodoStatusEnum) => void
    sort: (sortType: SortType) => void,
    deleteCompleted: () => void,
    changeSortType: () => void
}
export interface Store extends State, Action { }

export const initialState: State = {
    todoList: [],
    sortType: SortType.ASC
};

export const actions = (set: any): Action => {
    const add = (item: Omit<TodoModel, 'id' | 'createAt'>) => {
        const date = new Date().getTime();
        const id = Utility.generateUniqueId();
        const newItem = { ...item, createAt: date, id, status: TodoStatusEnum.ACTIVE } as TodoModel;
        set((state: State) => {
            if (state.sortType === SortType.ASC) return [...state.todoList, newItem]
            return [newItem, ...state.todoList]
        }, false, 'add_todo')
    }

    const remove = (id: string) => {
        set((state: State) => {
            return state.todoList.filter(item => item.id !== id)
        }, false, 'remove_todo')
    }

    const complete = (id: string, status: TodoStatusEnum) => {
        set((state: State) => {
            return state.todoList.map((el) => {
                if (el.id === id) {
                    return { ...el, status };
                }
                return el;
            })
        }, false, 'complete_todo')
    }
    const deleteCompleted = () => {
        set((state: State) => {
            return state.todoList.filter(i => i.status !== TodoStatusEnum.COMPLETED);
        }, false, 'remove_completed')
    }
    const sort = (sortType: SortType) => {
        set((state: State) => {
            return state.todoList.sort((a, b) => {
                if (state.sortType === SortType.ASC)
                    return a.createAt - b.createAt
                return b.createAt - a.createAt
            })
        }, false, 'sort_todo')
    }
    const changeSortType = (() => {
        set((state: State) => {
            if (state.sortType === SortType.ASC) return SortType.DESC
            else return SortType.ASC
        }, false, 'change_sort_type')
    })

    return { add, remove, complete, deleteCompleted, sort, changeSortType }

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
