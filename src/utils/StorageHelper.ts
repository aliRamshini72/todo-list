import {TodoModel} from "../models/todo.model";


enum StorageKey {
    TODO_LIST = 'todo_list'
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

}