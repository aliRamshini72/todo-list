import {TodoModel, TodoStatusEnum} from "../models/todo.model";
import {FC, HTMLAttributes} from "react";
import {DeleteOutlined} from '@ant-design/icons'
import {Utility} from "../utils/Utility";

interface Props  extends HTMLAttributes<HTMLDivElement> {
    item: TodoModel,
    onRemove: (id: string) => void,
    onComplete: (id: string, status: TodoStatusEnum) => void
}

const TodoItem: FC<Props> = ({item, onRemove, onComplete}) => {
    return (
        <div className={'flex flex-row gap-x-2 p-2 m-2 shadow shadow-neutral-500 rounded'}>
            <article className={'flex-auto'}>
                <h3 className={'text-lg'}>
                    {item.label}
                </h3>
                <p className={'text-gray-500  my-1'}>
                    {item.desc}
                </p>
                <hr/>
                <p className={'text-gray-400 text-sm'}>
                    {Utility.formatDate(item.createAt)}
                </p>
            </article>
            <div className={'flex-none'}>
                <DeleteOutlined className={'cursor-pointer text-red-500'} onClick={() => onRemove(item.id)}/>
            </div>
            <div className={'flex-none'}>
                <input
                    type={"checkbox"}
                    className={'h-6 w-6 cursor-pointer'}
                    checked={item.status === TodoStatusEnum.COMPLETED}
                    onChange={event => onComplete(item.id, item.status === TodoStatusEnum.COMPLETED ? TodoStatusEnum.ACTIVE : TodoStatusEnum.COMPLETED)}
                />
            </div>
        </div>
    )
}

export default TodoItem