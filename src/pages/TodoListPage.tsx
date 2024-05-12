import useTodoList, {SortType} from "../hooks/useTodoList";
import {StorageHelper} from "../utils/StorageHelper";
import EmptyData from "../components/EmptyData";
import TodoItem from "../components/TodoItem";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import Modal from "../components/Modal";
import CreateNewItem from "../components/CreateNewItem";


export default function TodoListPage() {
    const {data, action} = useTodoList({
        initialData: StorageHelper.getTodoList(),
        onSuccessAction: (items) => {
            StorageHelper.setTodoList(items)
        }
    })
    const [sortType , setSortType] = useState<SortType | null>(null);
    const [createModal, showCreateModal] = useState(false);

    useEffect(() => {
        if (sortType) action.sort(sortType)
    } , [sortType])
    return <div className={'flex flex-row justify-center my-4 mx-2'}>
        <div
            className={'lg:basis-1/2 md:basis-3/4 basis-full  shadow-md border border-neutral-400 border-solid rounded '}>
            <Header
                createNewItem={() => showCreateModal(true)}
                filterCompleted={(isCompleted) => action.filterCompleted(isCompleted)}
                deleteCompleted={() => null}
                sort={() => {
                    if (sortType === SortType.ASC) setSortType(SortType.DESC)
                    else setSortType(SortType.ASC)
                }}
            />
            {
                data && data.length > 0 ? data.map((item) =>
                    <TodoItem key={item.id} item={item} onRemove={action.remove}/>
                ) : <EmptyData/>
            }
        </div>
        <Modal
            open={createModal}
            onClose={() => showCreateModal(false)}>
            <CreateNewItem onSubmit={(values) => {
                action.add({...values})
                showCreateModal(false)
            }}/>
        </Modal>
    </div>
}