import React, { useEffect, useState } from 'react';
import { useGetAllOrdersQuery, useUpdateStatusMutation } from '../redux/apis/adminApi';
import { toast } from 'sonner';
import { Outlet } from 'react-router-dom';

const AdminAllOrders = () => {
    const [statusData, setStatusData] = useState({})
    const [updateStatus, { isSuccess }] = useUpdateStatusMutation()
    const { data } = useGetAllOrdersQuery();
    console.log(data);
    useEffect(() => {
        if (isSuccess) {
            toast.success("Status Update Success")
            document.getElementById("edit").close()
        }
    }, [isSuccess])

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-light-golden dark:bg-gray-800 text-left text-sm text-gray-500 dark:text-gray-300">
                <thead className="bg-light-golden dark:bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">Product Name</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">User Name</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">Status</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 md:hidden">Price & Action</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">Price</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">Address</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">Payment Method</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100 dark:divide-gray-700 dark:border-gray-700">
                    {data && data.map(order => (
                        <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                                {order.orderItems.map(item => (
                                    <div key={item._id}>
                                        <div className="font-medium text-gray-700 dark:text-gray-300">{item.productId && item.productId.name}</div>
                                        <div className="text-gray-400 dark:text-gray-400">Qty: {item.quantity}</div>
                                    </div>
                                ))}
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <div className="text-sm">
                                    <div className="font-medium text-gray-700 dark:text-gray-300">{order.userId && order.userId.mobile}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${order.status === 'cancelled' ? 'bg-red-50 text-red-600 dark:bg-red-600 dark:text-white' : 'bg-green-50 text-green-600 dark:bg-green-600 dark:text-white'}`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${order.status === 'cancelled' ? 'bg-red-600' : 'bg-green-600'}`}></span>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 md:hidden">
                                <div className="flex justify-between items-center">
                                    <div className="text-gray-900 dark:text-gray-200 font-medium">₹{order.total}</div>
                                    <div className="flex gap-2">
                                        <button onClick={() => {
                                            document.getElementById('edit').showModal();
                                            setStatusData({ ...statusData, orderId: order._id });
                                        }} className="text-blue-600 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                ₹{order.total}
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <div className="text-sm">
                                    <div className="font-medium text-gray-700 dark:text-gray-300">{order.deliveryAddressId && order.deliveryAddressId.addressType}</div>
                                    <div className="text-gray-400 dark:text-gray-400">{order.deliveryAddressId && order.deliveryAddressId.city}, {order.deliveryAddressId && order.deliveryAddressId.state}</div>
                                    <div className="text-gray-400 dark:text-gray-400">{order.deliveryAddressId && order.deliveryAddressId.country} - {order.deliveryAddressId && order.deliveryAddressId.pincode}</div>
                                    <div className="text-gray-400 dark:text-gray-400">Mobile: {order.deliveryAddressId && order.deliveryAddressId.mobile}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                {order.paymentMethod}
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <div className="flex justify-end gap-4">
                                    <button onClick={() => {
                                        document.getElementById('edit').showModal();
                                        setStatusData({ ...statusData, orderId: order._id });
                                    }} className="text-blue-600 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <dialog id="edit" className="modal">
                <div className="modal-box bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-gray-800 dark:border-yellow-600">
                    <h3 className="font-bold text-xl text-yellow-600 dark:text-yellow-400">Update Order Status</h3>
                    <select onChange={e => setStatusData({ ...statusData, status: e.target.value })} className="select w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 ease-in-out">
                        <option disabled selected className="text-gray-500 dark:text-gray-400">Select The Status</option>
                        <option value={"delivered"}>Delivered</option>
                        <option value={"shipped"}>Shipped</option>
                        <option value={"dispatched"}>Dispatched</option>
                    </select>
                    <button className="bg-yellow-500 my-5 text-white px-4 py-2 rounded-lg hover:bg-yellow-600" onClick={e => updateStatus(statusData)}>Update</button>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>








    );
};

export default AdminAllOrders;
