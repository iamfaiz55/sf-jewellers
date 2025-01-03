import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useGetAllScrollCardsQuery } from '../redux/apis/openApi';
import { useAddScrollCardMutation, useDeleteScrollCardMutation, useUpdateScrollCardMutation } from '../redux/apis/adminApi';
import { toast } from 'sonner';

const AdminScrollCards = () => {
    const { data, refetch } = useGetAllScrollCardsQuery()
    const [selectedData, setSelectedData] = useState({})
    const [deleteScrollCard, { isSuccess }] = useDeleteScrollCardMutation()

    // console.log(selectedData);
    useEffect(() => {
        if (isSuccess) {
            refetch()
        }
    }, [isSuccess])


    return <div className='bg-light-golden'>
        <div className='text-center'>
            <button onClick={e => {

                document.getElementById('add').showModal()
            }} className="btn w-48  bg-golden">
                Add
            </button>
        </div>
        <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md '>

            <div className="m-5">
                <table className="w-full border-collapse bg-light-golden text-left text-sm text-gray-500">
                    <thead className="bg-yellow-50 ">
                        <tr>
                            <th scope="col" className="px-6 font-bold py-4  text-gray-900">No.</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">Tile</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">Image</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">Link</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {data && data.map((item, i) => (
                            <tr key={item._id} className="hover:bg-gray-50 ">
                                <td className="px-6 py-4 text-gray-900">{i + 1}</td>
                                <td className="px-6 py-4 text-gray-900">{item.title}</td>
                                <td className="px-6 py-4 text-gray-900">
                                    <img src={item.image} alt={item.title} width={100} />
                                </td>
                                <td className="px-6 py-4 text-gray-900">
                                    <Link to={item.link} className='font-bold  text-blue-500'>Link</Link>
                                </td>

                                <td className="px-6 py-4 text-gray-900 ">
                                    <button onClick={e => {
                                        setSelectedData(item)
                                        document.getElementById('edit').showModal()
                                    }} className="text-blue-600 hover:text-blue-900 btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                    <button onClick={e => {
                                        deleteScrollCard(item._id)
                                        // setSelectedData(item)
                                        // document.getElementById('edit').showModal()
                                    }} className="btn text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 30 30">
                                            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* add modal */}
            <dialog id="edit" className="modal">
                <div className="modal-box bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-bold text-xl text-yellow-600">Edit Scroll Card</h3>

                    <Form edit={selectedData} />

                </div>
            </dialog>
            {/* add modal */}
            <dialog id="add" className="modal">
                <div className="modal-box bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-bold text-xl text-yellow-600">Add Scroll Card</h3>

                    <Form />

                </div>
            </dialog>


        </div>
    </div >
}

const Form = (edit) => {
    // console.log(edit.edit);
    const [updateScrollCard, { isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateScrollCardMutation()
    const [addScrollCard, { isSuccess, isLoading, error, isError }] = useAddScrollCardMutation()
    const { data, refetch } = useGetAllScrollCardsQuery()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: edit.edit ? edit.edit.title : "",
            link: edit.edit ? edit.edit.link : "",
            image: edit.edit ? edit.edit.image : "",
        },
        validationSchema: yup.object({
            title: yup.string().required("Enter Title"),
            link: yup.string().required("Enter link"),
            image: yup.string().required("Enter image"),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (edit.edit) {
                const fd = new FormData()
                fd.append("title", values.title)
                fd.append("link", values.link)
                fd.append("image", values.image)

                updateScrollCard({ fd, _id: edit.edit._id })
            } else {
                const fd = new FormData()
                fd.append("title", values.title)
                fd.append("link", values.link)
                fd.append("image", values.image)

                addScrollCard(fd)
            }

            resetForm()
        }
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success("Scroll Card Create Success")
            refetch()
            document.getElementById("add").close()
        }
    }, [isSuccess])
    useEffect(() => {
        if (updateSuccess) {
            toast.success("Scroll Card Update Success")
            refetch()
            document.getElementById("edit").close()
        }
    }, [updateSuccess])
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen p-5 bg-light-golden min-w-screen">
                <div className="flex space-x-2 animate-pulse">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
            </div>
        );
    }

    return <>
        <div className="">
            {/* <h3 className="font-bold text-xl text-yellow-600">Edit Address</h3> */}
            <pre>{JSON.stringify(edit, null, 2)}</pre>
            <pre>{JSON.stringify(formik.values, null, 2)}</pre>
            {
                isLoading || updateLoading
                    ? <>
                        <div class="flex items-center justify-center min-h-screen p-5 bg-light-golden min-w-screen">

                            <div class="flex space-x-2 animate-pulse">
                                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                            </div>

                        </div>
                    </>
                    : <>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 m-1">Title</label>
                                <input type="text"
                                    {...formik.getFieldProps("title")}

                                    // value={edit && edit.edit && edit.edit.title}

                                    className="input w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="link" className="block text-gray-700">Link</label>
                                <input type="text"
                                    {...formik.getFieldProps("link")}

                                    className="input w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="logo" className="block text-gray-700">Image </label>
                                <input type="file"
                                    onChange={e => formik.setFieldValue("image", e.target.files[0])}
                                    id="logo"
                                    name="logo"
                                    // value={edit && edit.edit && edit.edit.image && edit.edit.image}
                                    className="file-input file-input-bordered file-input-warning w-full "
                                />
                            </div>

                            {
                                edit.edit && <>
                                    <img src={edit && edit.edit && edit.edit.image} width={100} alt="" />
                                </>
                            }
                            <button type='submit' className="bg-yellow-500 my-5 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">{edit.edit ? "update" : "Add"}</button>
                        </form>
                    </>
            }

            <div className="modal-action">
                <form method="dialog">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">Close</button>
                </form>
            </div>
        </div>
    </>
}

export default AdminScrollCards