import React, { useEffect, useState } from 'react'
import { useGetAllAddImagesQuery } from '../redux/apis/openApi';
import { useAddImagesMutation, useDeleteAddImageMutation } from '../redux/apis/adminApi';
import { toast } from 'sonner';

const AdminAddImages = () => {
    const { data, refetch } = useGetAllAddImagesQuery();
    const [deleteAddImage, { isSuccess: deleteSuccess, isLoading: deleteLoading }] = useDeleteAddImageMutation()
    // console.log(data);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [addImage, { isSuccess, isLoading }] = useAddImagesMutation();


    useEffect(() => {
        if (isSuccess) {
            toast.success("Image Added Successfully");
            refetch()
            document.getElementById("addimg").close();
            setImage(null);
            setImagePreview(null);
        }
    }, [isSuccess]);
    useEffect(() => {
        if (deleteSuccess) {
            toast.success("add image Delete Success")
            refetch()
        }
    }, [deleteSuccess])


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <div className="text-end mb-4">
                <button
                    className="mr-7 bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                    onClick={() => document.getElementById('addimg').showModal()}
                >
                    Add image
                </button>
            </div>

            {/* Add Carousel */}
            <dialog id="addimg" className="modal border-yellow-400 rounded-lg">
                <div className="modal-box  relative">
                    <h3 className="text-xl font-bold text-yellow-600">Add Image</h3>

                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                            <div className="text-white text-lg">Loading...</div>
                        </div>
                    ) : (
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input w-full mt-4"
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Image Preview"
                                    width={200}
                                    className="mt-5 rounded-lg"
                                />
                            )}
                        </div>
                    )}

                    <div className="modal-action">
                        <button
                            className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                            onClick={() => document.getElementById('addimg').close()}
                        >
                            Close
                        </button>
                        <button
                            onClick={e => {
                                const fd = new FormData();
                                fd.append("images", image);
                                addImage(fd);
                            }}
                            className="bg-amber-500 mx-3 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </dialog>




            {/* print image here */}
            <div className="mt-8 overflow-x-auto shadow-md sm:rounded-lg mb-4 p-5">
                <h2 className="text-xl font-bold text-yellow-600 mb-4">Uploaded Images For Adds</h2>
                <table className="min-w-full text-sm text-left text-gray-500 border-spacing-2">
                    <thead className="text-xs text-gray-700 uppercase bg-light-golden">
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-light-golden uppercase border-b border-gray-600">
                            <th className="p-3 font-bold uppercase text-gray-600">#</th>
                            <th className="p-3 font-bold uppercase text-gray-600">Image</th>
                            <th className="p-3 font-bold uppercase text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={item._id} className="hover:bg-light-golden transition">
                                    <td className="p-3 text-gray-800 text-center border-b">{index + 1}</td>
                                    <td className="p-3 text-gray-800 text-center border-b">
                                        <img
                                            src={item.image}
                                            alt={`Uploaded ${item._id}`}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-3 text-gray-800 text-center border-b">
                                        <button
                                            onClick={() => deleteAddImage(item._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-150"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center px-4 py-2 border-b text-gray-800">
                                    No images found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


        </>
    );
};


export default AdminAddImages