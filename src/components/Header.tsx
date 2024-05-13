import {FC} from "react";

interface HeaderProps {
    createNewItem : () => void ,
    sort : () => void ,
    deleteCompleted : () => void ,
    filterCompleted : (isCompleted : boolean) => void ,
    showCompleted : boolean
}

const Header : FC<HeaderProps> = (props) => {
    const {createNewItem , sort , deleteCompleted , filterCompleted , showCompleted} = props
    return (
        <div className={'border-neutral-400 border-b border-solid'}>
            <h1 className={'text-center p-2 bg-sky-300'}>
                Todo List Application
            </h1>
            <div className={'flex flex-row p-2 justify-between items-center my-2'}>
                <button
                    onClick={createNewItem}
                    className={'text-white px-2 py-1 rounded outline-none focus:outline-none  bg-green-600  text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'}>
                   create new item
                </button>
                <button
                    onClick={sort}
                    className={'text-white px-2 py-1 rounded outline-none focus:outline-none  bg-blue-400  text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'}>
                    sort
                </button>
                <button
                    onClick={deleteCompleted}
                    className={'text-white px-2 py-1 rounded outline-none focus:outline-none  bg-red-500  text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'}>
                    delete completed
                </button>
                <input
                    onChange={(event )=> filterCompleted(Boolean(event.target.checked))}
                    type={"checkbox"}
                    className={'h-6 w-6'}
                    checked={showCompleted}
                />
            </div>
        </div>


    )
}
export default Header