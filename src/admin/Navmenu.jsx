/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAddMenuItemMutation, useDeleteMenuItemMutation } from '../redux/apis/adminApi';
import { toast } from 'sonner';
import { useGetAllMenuItemsQuery } from '../redux/apis/openApi';

const Navmenu = () => {
    // useDelete
    const { data, refetch } = useGetAllMenuItemsQuery()
    const [deleteMenuItem, { isSuccess }] = useDeleteMenuItemMutation()
    // console.log(data);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Menu Item Delete Success")
            refetch()
        }
    }, [isSuccess])


    return <div className='bg-light-golden dark:bg-gray-800'>
        <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md'>
            <div className='text-center'>
                <button onClick={() => document.getElementById('add').showModal()} className="btn w-48 bg-golden hover:bg-golden-dark text-white">
                    Add
                </button>
            </div>
            <div className="m-5">
                <table className="w-full border-collapse bg-white dark:bg-gray-800 text-left text-sm text-gray-500 dark:text-gray-300">
                    <thead className="bg-yellow-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 font-bold py-4 text-gray-900 dark:text-white">No.</th>
                            <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">Menu Item</th>
                            <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">Image</th>
                            <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">Link</th>
                            <th className="px-6 py-4 font-bold text-gray-900 dark:text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100 dark:divide-gray-600">
                        {data && data.map((menuItem, i) => (
                            <React.Fragment key={menuItem._id}>
                                <tr className="bg-gray-200 dark:bg-gray-700">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white" colSpan={5}>
                                        <div className='flex justify-between'>
                                            <div>
                                                {menuItem.menuitem}
                                            </div>
                                            <div>
                                                <button type="button" className="btn w-48 mr-52 bg-green-500 hover:bg-green-600 text-white">On</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {menuItem.children.map((child, j) => (
                                    <tr key={child.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 text-gray-900 dark:text-white">{i + 1}.{j + 1}</td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-white">{child.menuitem}</td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                                            <img src={child.image} alt={child.menuitem} width={50} className="rounded" />
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                                            <Link to={child.link} className='font-bold text-blue-500 hover:text-blue-600 dark:text-blue-400'>Link</Link>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                                            <button className="text-blue-600 hover:text-blue-900 btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => deleteMenuItem({ menuId: menuItem._id, childId: child._id })} className="btn text-red-500 hover:text-red-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 30 30">
                                                    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <dialog id="add" className="modal">
                <div className="modal-box bg-yellow-50 dark:bg-gray-700 border border-yellow-200 rounded-lg">
                    <h3 className="font-bold text-xl text-yellow-600 dark:text-yellow-400">Add Scroll Card</h3>
                    <Form />
                </div>
            </dialog>
        </div>
    </div>

}




// eslint-disable-next-line react/prop-types
const Form = ({ edit }) => {
    // eslint-disable-next-line no-unused-vars
    const { data, refetch } = useGetAllMenuItemsQuery()
    const [addMenuItem, { isSuccess }] = useAddMenuItemMutation()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            // eslint-disable-next-line react/prop-types
            menuitem: edit?.menuitem || '',
            menuImage: edit?.menuImage || null,
            children: edit?.children || [
                {
                    menuitem: '',
                    subtitle: '',
                    image: null,
                    link: ''
                }
            ],
        },
        validationSchema: yup.object({
            menuitem: yup.string().required('Enter Menu Item'),
            children: yup.array().of(
                yup.object({
                    menuitem: yup.string().required('Enter Child Menu Item'),
                    subtitle: yup.string().required('Enter Subtitle'),
                    image: yup.mixed().required('Upload an Image'),
                    link: yup.string().required('Enter Link'),
                })
            ),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(values);
            const fd = new FormData();
            fd.append('menuitem', values.menuitem);
            if (values.menuImage) {
                fd.append('menuImage', values.menuImage);
            }

            values.children.forEach((child, index) => {
                fd.append(`children[${index}].menuitem`, child.menuitem);
                fd.append(`children[${index}].subtitle`, child.subtitle);
                fd.append(`children[${index}].link`, child.link);
                if (child.image) {
                    fd.append(`children[${index}].image`, child.image);
                }
            });

            addMenuItem(fd);
            resetForm();
        },
    });

    const handleAddChild = () => {
        const newChild = {
            menuitem: '',
            subtitle: '',
            image: null,
            link: ''
        };
        formik.setFieldValue('children', [...formik.values.children, newChild]);
    };

    const handleRemoveChild = (index) => {
        const updatedChildren = formik.values.children.filter((_, i) => i !== index);
        formik.setFieldValue('children', updatedChildren);
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success("Menu Item Success")
            document.getElementById("add").close()
            refetch()
        }
    }, [isSuccess])

    // useEffect(() => {
    //     if (isLoading) {
    //         return <>
    //             <div className="flex items-center justify-center min-h-screen p-5 bg-light-golden min-w-screen">
    //                 <div className="flex space-x-2 animate-pulse">
    //                     <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
    //                     <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
    //                     <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
    //                 </div>
    //             </div>
    //         </>
    //     }
    // }, [isLoading])


    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="menuitem" className="block text-gray-700 dark:text-gray-300 m-1">Menu Item</label>
                    <input
                        type="text"
                        {...formik.getFieldProps('menuitem')}
                        className="input w-full bg-yellow-50 dark:bg-gray-700 border border-yellow-300 dark:border-yellow-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="menuImage" className="block text-gray-700 dark:text-gray-300">Menu Image</label>
                    <input
                        type="file"
                        onChange={e => formik.setFieldValue('menuImage', e.currentTarget.files[0])}
                        id="menuImage"
                        name="menuImage"
                        className="file-input file-input-bordered file-input-warning w-full"
                    />
                </div>

                {formik.values.children.map((child, index) => (
                    <div key={child._id} className="mb-4 border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
                        <div className="mb-4">
                            <label htmlFor={`children[${index}].menuitem`} className="block text-gray-700 dark:text-gray-300">Child Menu Item</label>
                            <input
                                type="text"
                                {...formik.getFieldProps(`children[${index}].menuitem`)}
                                className="input w-full bg-yellow-50 dark:bg-gray-700 border border-yellow-300 dark:border-yellow-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`children[${index}].subtitle`} className="block text-gray-700 dark:text-gray-300">Subtitle</label>
                            <input
                                type="text"
                                {...formik.getFieldProps(`children[${index}].subtitle`)}
                                className="input w-full bg-yellow-50 dark:bg-gray-700 border border-yellow-300 dark:border-yellow-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`children[${index}].image`} className="block text-gray-700 dark:text-gray-300">Image</label>
                            <input
                                type="file"
                                onChange={e => formik.setFieldValue(`children[${index}].image`, e.currentTarget.files[0])}
                                id={`children[${index}].image`}
                                name={`children[${index}].image`}
                                className="file-input file-input-bordered file-input-warning w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`children[${index}].link`} className="block text-gray-700 dark:text-gray-300">Link</label>
                            <input
                                type="text"
                                {...formik.getFieldProps(`children[${index}].link`)}
                                className="input w-full bg-yellow-50 dark:bg-gray-700 border border-yellow-300 dark:border-yellow-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <button type="button" onClick={() => handleRemoveChild(index)} className="text-red-500 dark:text-red-400">Remove</button>
                    </div>
                ))}

                <button type="button" onClick={handleAddChild} className="btn bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600">
                    Add Child Item
                </button>

                <div className="modal-action mt-4">
                    <button type="submit" className="btn bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600">Submit</button>
                    <button type="button" onClick={() => document.getElementById('add').close()} className="btn bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500">
                        Close
                    </button>
                </div>
            </form>
        </div>

    );
};



export default Navmenu