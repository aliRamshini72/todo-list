import {useFormik} from "formik";
import * as Yup from "yup";
import {TodoModel} from "../models/todo.model";

const validatorSchema = Yup.object().shape({
    label: Yup.string().required("enter title") ,
    desc: Yup.string().required("enter description")
})
interface Props {
    onSubmit : (values : Pick<TodoModel , 'label' | 'desc'>) => void
}
export default function CreateNewItem({onSubmit} : Props){
    const formik = useFormik({
        initialValues : {
            label : '' ,
            desc : ''
        } ,
        validationSchema: validatorSchema,
        onSubmit: (values)=>{
            onSubmit(values)
        }
    })

    return (
        <>
            <h1 className={'mb-4'}>
                create new item
            </h1>
            <form className="flex flex-col gap-y-4"
                  onSubmit={formik.handleSubmit}>
                {/*todo create input component */}
                <div >
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-1"
                        htmlFor="title"
                    >
                        title
                    </label>
                    <input
                        id={'label'}
                        name={'label'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.label}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="title"
                    />
                    {formik.errors.label ?
                        <p className={'text-red-500 text-xs h-4 pt-1'}>{formik.errors.label}</p> :
                        <p className={'h-4 pt-1'}>{" "}</p>}
                </div>
                <div >
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-1"
                        htmlFor="description"
                    >
                        description
                    </label>
                    <input
                        id={'desc'}
                        name={'desc'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.desc}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="description"
                    />
                    {formik.errors.desc ?
                        <p className={'text-red-500 text-xs h-4 pt-1'}>{formik.errors.desc}</p> :
                        <p className={'h-4 pt-1'}>{" "}</p>}
                </div>
                <button
                    type={'submit'}
                    className={'text-white w-full px-2 py-1 rounded outline-none focus:outline-none  bg-green-600  text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'}>
                    create new item
                </button>

            </form>
        </>
    )
}