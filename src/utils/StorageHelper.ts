import { SortType } from "../hooks/useTodoList";
import { TodoModel } from "../models/todo.model";


enum StorageKey {
    TODO_LIST = 'todo_list',
    SORT_TYPE_TODO = 'todo_list_sort'
}


export class StorageHelper {
    public static getTodoList(): TodoModel[] {
        const str = localStorage.getItem(StorageKey.TODO_LIST)
        if (str) return JSON.parse(str) as TodoModel[]
        return []
    }

    public static removeAllTodoList(): void {
        localStorage.removeItem(StorageKey.TODO_LIST)
    }

    public static setTodoList(items: TodoModel[]): void {
        localStorage.setItem(StorageKey.TODO_LIST, JSON.stringify(items))
    }

    public static getSortType(): SortType {
        const str = localStorage.getItem(StorageKey.SORT_TYPE_TODO)
        if (str) return str as SortType
        return SortType.ASC
    }
    public static setSortType(type: SortType): void {
        localStorage.setItem(StorageKey.SORT_TYPE_TODO, type)
    }
}