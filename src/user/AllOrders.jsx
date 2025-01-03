import { useEffect } from 'react';
import { useCancelOrderMutation, useGetOrdersQuery } from '../redux/apis/userApi';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { usePostHistoryMutation } from '../redux/apis/openApi';

const AllOrders = () => {
    const [postHistory] = usePostHistoryMutation()
    const { user } = useSelector(state => state.userData);
    const { data, isError } = useGetOrdersQuery(user._id);
    const [cancelOrder, { isSuccess }] = useCancelOrderMutation()
    console.log(data);


    useEffect(() => {
        if (isSuccess) {
            toast.success("Order Cancel Success")
        }
    }, [isSuccess])
    // productId, cartId, 
    useEffect(() => {
        if (user && data) {
            const ordersIds = data.map(order => order._id);

            postHistory({ userId: user._id, type: "allOrders", ordersId: ordersIds });
        }
    }, [user, data, postHistory]);
    return (
        <div className="py-14 px-8 md:px-6 2xl:px-20 2xl:container  dark:bg-gray-900 2xl:mx-auto space-y-8 bg-light-golden">
            {data && data.length < 1 && (
                <div className="p-4 bg-light-golden rounded-lg shadow-md dark:bg-gray-900">
                    {/* Other content related to orders... */}

                    <div className="flex flex-col items-center justify-center h-full p-6 bg-light-golden rounded-lg shadow-md dark:bg-gray-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 12h18m-9 9h9" />
                        </svg>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No Orders Available</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-center">
                            You currently have no orders. <br />
                            Start shopping to place your first order!
                        </p>

                    </div>
                </div>
            )}



            {
                isError
                    // ? <div className='text-center font-bold text-3xl'>{JSON.stringify(error.data.message)}</div>
                    ? <div className='text-center font-bold text-3xl dark:bg-gray-900'>Server Error</div>
                    : <>
                        {
                            data && data.length > 0 && <h1 className="text-2xl font-semibold mb-4 ">Your Orders</h1>

                        }
                        {
                            data && data.map(order => {
                                if (order.status != "cancelled") {
                                    return <motion.div
                                        key={order._id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0"
                                    >
                                        <div className={`flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8`}>
                                            <div className="flex flex-col justify-start items-start border border-1 border-golden dark:bg-gray-900  bg-light-golden px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
                                                <div className="flex justify-between w-full">
                                                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800 ">
                                                        {/* Order # */}
                                                    </p>
                                                    <button
                                                        // onClick={e => cancelOrder(order._id)}
                                                        onClick={() => document.getElementById("cancelOrder").showModal()}
                                                        className="btn bg-yellow-400 btn-sm  md:btn-md  text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                                                    >
                                                        Cancel Order
                                                    </button>


                                                    <dialog id="cancelOrder" className="modal">
                                                        <div className="modal-box bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
                                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Confirm Cancellation</h3>
                                                            <p className="py-4 text-gray-700 dark:text-gray-300">
                                                                Are you sure you want to cancel this order? This action cannot be undone.
                                                            </p>
                                                            <div className="modal-action">
                                                                <button
                                                                    onClick={() => cancelOrder(order._id)}
                                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                                                >
                                                                    Confirm Cancel
                                                                </button>
                                                                <button
                                                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                                                                    onClick={() => document.getElementById('cancelOrder').close()} // Close modal on cancel
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </dialog>

                                                </div>
                                                {order.orderItems.map((item) => {
                                                    // Find the matching variant from the product based on varientId
                                                    // console.log(item);

                                                    const matchedVarient = item.productId && item.productId.varient.find(v => v._id === item.varientId);

                                                    return (
                                                        <div
                                                            key={item._id}
                                                            className={` mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full`}
                                                        >
                                                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                                                <img
                                                                    className="w-full"
                                                                    src={item.productId.images[0]}
                                                                    alt={item.productId.name}
                                                                />
                                                            </div>
                                                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                                                <div className="w-full flex flex-col justify-start items-start space-y-8 overflow-hidden">
                                                                    <h3 className="text-sm  sm:text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                                                        {item.productId?.name}
                                                                    </h3>
                                                                    <div className="flex justify-start items-start flex-col space-y-2">
                                                                        <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                            <span className="dark:text-gray-800 text-gray-300">Material: </span> {item.productId?.material}
                                                                        </p>
                                                                        <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                            <span className="dark:text-gray-400 text-gray-300">Weight: </span> {matchedVarient?.prductWeight}
                                                                        </p>
                                                                        {matchedVarient && (
                                                                            <>
                                                                                <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                                    <span className="dark:text-gray-400 text-gray-300">Price: </span> ${matchedVarient?.price}
                                                                                </p>
                                                                                <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                                    <span className="dark:text-gray-400 text-gray-300 overflow-hidden">Description: </span> {matchedVarient.desc}
                                                                                </p>
                                                                                <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                                    <span className="dark:text-gray-400 text-gray-300">Height: </span> {matchedVarient.height}
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                        <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                            <span className="dark:text-gray-400 text-gray-300">Order Status: </span> {order.status}
                                                                        </p>
                                                                        <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                            <span className="dark:text-gray-400 text-gray-300">Order Id: </span>{order._id}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-between space-x-8 items-start w-full overflow-hidden">

                                                                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                                                        Quantity: {item.quantity}
                                                                    </p>
                                                                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                                                        Total: ${(matchedVarient ? matchedVarient?.price * item.quantity : item.productId?.price * item.quantity).toFixed(2)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                            </div>
                                        </div>
                                    </motion.div>
                                }
                            }
                            )
                        }
                        {
                            data && data.length > 0 && <h1 className="text-2xl font-semibold mb-4">Cancelled Orders</h1>

                        }

                        {
                            data && data.map(order => {
                                if (order.status == "cancelled") {
                                    return <motion.div
                                        key={order._id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0"
                                    >
                                        <div className={`flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8`}>
                                            <div className="flex flex-col justify-start items-start border border-1 border-amber-500 dark:bg-gray-800  bg-light-golden px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-2xl">

                                                {order.orderItems.map((item) => {
                                                    const matchedVarient = item.productId?.varient.find(v => v._id === item.varientId);

                                                    return (
                                                        <div
                                                            key={item._id}
                                                            className={` mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full`}
                                                        >
                                                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                                                <img
                                                                    className="w-full"
                                                                    src={item.productId.images[0]}
                                                                    alt={item.productId.name}
                                                                />
                                                            </div>
                                                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                                                        {item.productId?.name}
                                                                    </h3>
                                                                    <div className="flex justify-start items-start flex-col space-y-2">
                                                                        <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                            <span className="dark:text-gray-400 text-gray-300">Material: </span> {item.productId?.material}
                                                                        </p>
                                                                        <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                            <span className="dark:text-gray-400 text-gray-300">Weight: </span> {matchedVarient?.prductWeight}
                                                                        </p>
                                                                        {matchedVarient && (
                                                                            <>
                                                                                <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                                    <span className="dark:text-gray-400 text-gray-300">Price: </span> ${matchedVarient?.price}
                                                                                </p>
                                                                                <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                                    <span className="dark:text-gray-400 text-gray-300">Description: </span> {matchedVarient?.desc}
                                                                                </p>
                                                                                <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                                    <span className="dark:text-gray-400 text-gray-300">Height: </span> {matchedVarient?.height}
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                        <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                            <span className="dark:text-gray-400 text-gray-300">Order Status: </span> {order.status}
                                                                        </p>
                                                                        <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                            <span className="dark:text-gray-400 text-gray-300">Order Id: </span>{order._id}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-between space-x-8 items-start w-full">
                                                                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                                                        Quantity: {item.quantity}
                                                                    </p>
                                                                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                                                        Total: ${(matchedVarient ? matchedVarient?.price * item.quantity : item.productId?.price * item.quantity).toFixed(2)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                            </div>
                                        </div>
                                    </motion.div>
                                }
                            }
                            )
                        }
                    </>
            }
        </div>
    );
};

export default AllOrders;
