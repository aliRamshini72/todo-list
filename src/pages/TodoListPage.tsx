import EmptyData from "../components/EmptyData";
import TodoItem from "../components/TodoItem";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import Modal from "../components/Modal";
import CreateNewItem from "../components/CreateNewItem";
import {useTodoStore} from "../zustand/todoStore";
import {TodoModel, TodoStatusEnum} from "../models/todo.model";


export default function TodoListPage() {
    const todoList = useTodoStore(state => state.todoList)
    const {add, deleteCompleted, remove, complete, sort, updateList} = useTodoStore()
    const [createModal, showCreateModal] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [filterData, setFilterData] = useState<TodoModel[]>(todoList);
    const [draggingItem, setDraggingItem] = useState<TodoModel | null>(null);

    const showCompletedItems = (isCompleted: boolean) => {
        setShowCompleted(isCompleted)
    }
    const handleDragStart = (e: any, item: TodoModel) => {
        setDraggingItem(item)
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDragEnd = () => {
        setDraggingItem(null)
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = (e: any, targetItem: TodoModel) => {
        if (!draggingItem) return;
        if (filterData) {
            const list = [...filterData];
            const currentIndex = list.indexOf(draggingItem);
            const targetIndex = list.indexOf(targetItem);
            if (currentIndex !== -1 && targetIndex !== -1) {
                list.splice(currentIndex, 1);
                list.splice(targetIndex, 0, draggingItem);
                updateList(list)
            }

        }
    };

    useEffect(() => {
        if (showCompleted) setFilterData(todoList.filter(i => i.status === TodoStatusEnum.COMPLETED))
        else setFilterData(todoList)
    }, [showCompleted, todoList])


    return <div className={'flex flex-row justify-center my-4 mx-2'}>
        <div
            className={'lg:basis-1/2 md:basis-3/4 basis-full  shadow-md border border-neutral-400 border-solid rounded '}>
            <Header
                createNewItem={() => showCreateModal(true)}
                filterCompleted={showCompletedItems}
                showCompleted={showCompleted}
                deleteCompleted={deleteCompleted}
                sort={sort}
            />
            {
                filterData.length > 0 ? filterData.map((item) =>
                    <div
                        key={item.id}
                        draggable="true"
                        onDragStart={(e) =>
                            handleDragStart(e, item)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, item)}
                    >
                        <TodoItem
                            item={item}
                            onRemove={remove}
                            onComplete={complete}
                        />
                    </div>
                ) : <EmptyData/>
            }
        </div>
        {createModal && <Modal
            open={createModal}
            onClose={() => showCreateModal(false)}>
            <CreateNewItem onSubmit={(values) => {
                add({...values})
                showCreateModal(false)
            }}/>
        </Modal>
        }
    </div>
}