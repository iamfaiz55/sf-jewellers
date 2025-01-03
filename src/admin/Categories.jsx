import React, { useEffect, useState } from 'react';
import { useAddCategoryMutation, useDeleteCategoryMutation } from '../redux/apis/adminApi';
import { toast } from 'sonner';
import { useGetAllCAtegoriesQuery } from '../redux/apis/openApi';
// import { useGetAllCAtegoriesQuery } from '../redux/apis/userApi';

const Categories = () => {
    const [categoryData, setCategoryData] = useState('');
    const [addCategory, { isSuccess }] = useAddCategoryMutation();
    const [deleteCategory, { isSuccess: deleted }] = useDeleteCategoryMutation();
    const { data, refetch } = useGetAllCAtegoriesQuery();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Category Added Successfully");
            refetch();
            setCategoryData('');
            document.getElementById("add").close();
        }
    }, [isSuccess, refetch]);

    useEffect(() => {
        if (deleted) {
            toast.success("Category Deleted Successfully");
            refetch();
        }
    }, [deleted, refetch]);

    return (
        <div className='bg-light-golden min-h-screen p-5 dark:bg-gray-800'>
            <div className="text-center mb-5">
                <button
                    className='btn bg-golden text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition'
                    onClick={() => document.getElementById("add").showModal()}
                >
                    Add Category
                </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-300 shadow-lg bg-white dark:bg-gray-900">

                <table className="w-full bg-light-golden text-left text-sm text-gray-700 dark:bg-gray-500">
                    <thead className="bg-golden text-white">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium">#</th>
                            <th scope="col" className="px-6 py-4 font-medium">Category</th>
                            <th scope="col" className="px-6 py-4 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data && data.map((cat, i) => (
                            <tr key={cat._id} className="hover:bg-gray-100 transition dark:hover:bg-golden">
                                <td className="px-6 py-4">{i + 1}</td>
                                <td className="px-6 py-4 font-bold text-gray-900">{cat.category}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => deleteCategory(cat._id)}
                                        className='btn bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <dialog id="add" className="modal">
                    <div className="modal-box bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h3 className="font-bold text-2xl text-yellow-600 mb-4">Add New Category</h3>
                        <input
                            onChange={e => setCategoryData({ category: e.target.value })}
                            value={categoryData.category || ''}
                            placeholder="Enter Category"
                            className="input input-bordered input-warning w-full mb-5 p-2 text-gray-700 rounded"
                        />
                        <button
                            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition w-full mb-4"
                            onClick={() => addCategory(categoryData)}
                        >
                            Add
                        </button>
                        <div className="modal-action">
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                                onClick={() => document.getElementById("add").close()}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
}

export default Categories;
