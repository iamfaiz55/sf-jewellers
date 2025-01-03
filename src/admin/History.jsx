import React from 'react'
import { useGethistoryQuery } from '../redux/apis/adminApi'
import useScrollRestoration from '../hooks/useScrollRestoration'
import { useParams } from 'react-router-dom'

const History = () => {
    useScrollRestoration()
    const { id } = useParams()
    const { data } = useGethistoryQuery(id)
    console.log(data);

    return <>
        {/* Table for Medium and Large Screens */}
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 hidden md:block">
            {
                data && data[0].userId && <>
                    <div className="text-center">
                        <h1 className='p-5 text-3xl capitalize font-bold '>{data[0].userId.name ? data[0].userId.name : data[0].userId.number}</h1>

                    </div>
                </>
            }
            <table className="w-full border-collapse bg-light-golden dark:bg-gray-800 text-left text-sm text-gray-500 dark:text-gray-300">
                {/* Head */}
                <thead className="bg-light-golden dark:bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200"> # </th>
                        {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">Image</th> */}
                        {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">Name</th> */}
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">Type</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">Date And Time</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 hidden md:table-cell">Product Details</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-400 border-t border-gray-100 dark:divide-gray-700 dark:border-gray-700">
                    {data && data.map((item, i) => (
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700" key={item._id}>
                            <th className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">{i + 1}</th>
                            {/* <td className="px-6 py-4 hidden md:table-cell">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12">
                                        <img
                                            src={item.userId?.image || "https://via.placeholder.com/150"}
                                            alt={item.userId?.name || "Unknown User"}
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <div className="font-bold">{item.userId?.name}</div>
                            </td> */}
                            <td className="px-6 py-4 hidden md:table-cell">
                                <div>{item.type || "N/A"}</div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <div>{new Date(item.createdAt).toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                {item.type === "details" && item.productId ? (
                                    <div>
                                        <div className="font-bold">Name: {item.productId.name}</div>
                                        <div>Material: {item.productId.material}</div>
                                        <div>Purity: {item.productId.purity}</div>
                                        <div>Rating: {item.productId.rating}</div>
                                    </div>
                                ) : item.ordersId && item.ordersId.length > 0 ? (
                                    <div>
                                        {item.ordersId.map((order, index) => (
                                            <div key={order._id} className="mb-2">
                                                <div className="font-bold">Order {index + 1}</div>
                                                <div>Total: {order.total}</div>
                                                <div>Payment Method: {order.paymentMethod}</div>
                                                <div>Status: {order.status}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Card Layout for Small Screens */}
        <div className="block md:hidden m-5">
            {
                data && data[0].userId && <>
                    <div className="text-center">
                        <h1 className='p-5 text-3xl capitalize font-bold '>{data[0].userId.name ? data[0].userId.name : data[0].userId.number}</h1>

                    </div>
                </>
            }
            {data && data.map((item, i) => (
                <div key={item._id} className="mb-5 rounded-lg border border-gray-200 shadow-md p-4 bg-light-golden dark:bg-gray-800">
                    {/* Index */}
                    {/* <div className="font-medium text-gray-900 dark:text-gray-200"># {i + 1}</div> */}
                    {/* User Image */}
                    {/* <div className="flex items-center gap-3 my-3">
                        <div className="h-12 w-12">
                            <img
                                src={item.userId?.image || "https://via.placeholder.com/150"}
                                alt={item.userId?.name || "Unknown User"}
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                        <div className="font-bold text-gray-900 dark:text-gray-200">{item.userId?.name}</div>
                    </div> */}
                    {/* Type */}
                    <div className="text-gray-500 dark:text-gray-300"><strong>Type:</strong> {item.type || "N/A"}</div>
                    {/* Created At */}
                    <div className="text-gray-500 dark:text-gray-300"><strong>Date And Time:</strong> {new Date(item.createdAt).toLocaleString()}</div>
                    {/* Product Details */}
                    <div className="mt-3">
                        {item.type === "details" && item.productId ? (
                            <div className="text-gray-500 dark:text-gray-300">
                                <div><strong>Name:</strong> {item.productId.name}</div>
                                <div><strong>Material:</strong> {item.productId.material}</div>
                                <div><strong>Purity:</strong> {item.productId.purity}</div>
                                <div><strong>Rating:</strong> {item.productId.rating}</div>
                            </div>
                        ) : item.ordersId && item.ordersId.length > 0 ? (
                            <div className="text-gray-500 dark:text-gray-300">
                                {item.ordersId.map((order, index) => (
                                    <div key={order._id} className="mb-2">
                                        <div><strong>Order {index + 1}</strong></div>
                                        <div>Total: {order.total}</div>
                                        <div>Payment Method: {order.paymentMethod}</div>
                                        <div>Status: {order.status}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-500 dark:text-gray-300"></div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </>
}

export default History
