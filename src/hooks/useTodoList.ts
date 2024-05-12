import {useState} from "react";
import {TodoModel, TodoStatusEnum} from "../models/todo.model";
import {Utility} from "../utils/Utility";
import { StorageHelper } from "../utils/StorageHelper";

export enum SortType {
    ASC = 'ascending',
    DESC = 'descending'
}

interface UseTodoListReturn {
    data: TodoModel[],
    action: {
        add: (item: Pick<TodoModel, 'label' | 'desc'>) => void,
        remove: (id: string) => void,
        edit: (item: TodoModel) => void,
        complete: (id: string, status: TodoStatusEnum) => void
        sort: (sortType: SortType) => void ,
        filterCompleted : (isCompleted : boolean) => void
        deleteCompleted : () => void
    }
}

interface UseTodoListEntry {
    initialData: TodoModel[],
    onSuccessAction: (items: TodoModel[]) => void,
    
}

export default function useTodoList(entry: UseTodoListEntry): UseTodoListReturn {
    const {initialData, onSuccessAction} = entry;
    const [data, setData] = useState<TodoModel[]>(initialData);
    const [filterData, setFilterData] = useState<TodoModel[]>(data);
    const [sortType , setSortType] = useState<SortType | null>(null)
    const add = (item: Omit<TodoModel, 'id' | 'createAt'>) => {
        const date = new Date().getTime();
        const id = Utility.generateUniqueId();
        const newItem = {...item, createAt: date, id , status : TodoStatusEnum.ACTIVE} as TodoModel
        const newList = [...data];
        if (sortType === SortType.ASC) newList.push(newItem)
        else newList.push(newItem)
        setData(newList)
        onSuccessAction(newList)
    }

    const remove = (id: string) => {
        const newList = data.filter(item => item.id !== id);
        setData(newList)
        onSuccessAction(newList)
    }

    const edit = (item: TodoModel) => {
        const newList = data.map((el) => {
            if (el.id === item.id) {
                return {...item};
            }
            return el;
        });
        setData(newList)
        onSuccessAction(newList)
    }

    const complete = (id: string, status: TodoStatusEnum) => {
        const newList = data.map((el) => {
            if (el.id === id) {
                return {...el, status};
            }
            return el;
        });
        setData(newList)
        onSuccessAction(newList)
    }

    const sort = (sortType: SortType) => {
        const newList = data.sort((a, b) => {
            if (sortType === SortType.ASC)
                return a.createAt - b.createAt
            return b.createAt - a.createAt
        })
        setData(newList)
        onSuccessAction(newList)
    }

    const filterCompleted = (isCompleted: boolean) => {
        if (isCompleted) {
            const filter = data.filter((i) => i.status === TodoStatusEnum.COMPLETED)
            setFilterData(filter)
        } else setFilterData(data)
    }

    const deleteCompleted = () => {
        const filter = data.filter(i => i.status !== TodoStatusEnum.COMPLETED);
        setData(filter)
        onSuccessAction(filter)
    }

    return {
        data, action: {
            add, remove, edit, complete, sort , filterCompleted , deleteCompleted
        }
    }
}