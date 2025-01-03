/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useDeleteProductMutation, useGetAllProductsAdminQuery, useSetScheduleMutation } from '../redux/apis/adminApi';
import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
import { useLogoutAdminMutation } from '../redux/apis/adminAuthApi';
// import { useGetScheduleQuery } from '../redux/apis/openApi';

const Schedule = () => {
    const [logoutAdmin] = useLogoutAdminMutation()
    const [open, setOpen] = useState(false)
    const [editData, setEditData] = useState({})
    // const [timeRemaining, setTimeRemaining] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);

    const [selectedDate, setSelectedDate] = useState({});
    // const { data: schedules } = useGetScheduleQuery()
    // console.log(schedules);

    const { data, refetch, isError: isProdError, error: prodError } = useGetAllProductsAdminQuery()
    const [deleteProduct, { isSuccess: deleteSuccess }] = useDeleteProductMutation()
    // console.log(data);\
    const [varients, setVarients] = useState()









    // console.log(varients);
    // const navigate = useNavigate()
    useEffect(() => {
        if (deleteSuccess) {
            toast.success("Product Delete Success")
            refetch()
        }
    }, [deleteSuccess, refetch])
    useEffect(() => {
        if (isProdError) {
            toast.error(prodError.data.message)
            // toast.error(JSON.stringify(prodError.status))

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProdError])
    useEffect(() => {
        if (isProdError && prodError.status == 409) {
            // toast.error(prodError.data.message)
            logoutAdmin()

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProdError, logoutAdmin])

    return <>


        <div className=''>

            <div >
                {
                    open
                        ? <>
                            <Check
                                data={editData}
                                setOpen={setOpen}
                                setSelectedDate={setSelectedDate}
                                selectedDate={selectedDate}
                                setTimerStarted={setTimerStarted}
                                timerStarted={timerStarted}
                            />
                        </>
                        : <>

                            <div className="hidden sm:block overflow-x-auto shadow-md sm:rounded-lg m-5">
                                {/* Table View */}
                                <table className="w-full text-sm text-left text-gray-500 border-spacing-2">
                                    <thead className="text-xs text-gray-700 uppercase bg-light-golden dark:bg-gray-800">
                                        <tr className="text-md font-semibold tracking-wide text-center text-gray-900 bg-light-golden dark:bg-gray-800 uppercase border-b border-gray-600">
                                            <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">#</th>
                                            <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Name</th>
                                            <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Image</th>
                                            <th className="p-3 font-bold uppercase  text-gray-600 dark:text-gray-300">Description</th>
                                            <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Variant</th>
                                            <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.map((item, i) => {
                                            if (!item.isDelete) {
                                                return (
                                                    <tr key={item._id} className="bg-light-golden hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-800 transition">
                                                        <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{i + 1}</td>
                                                        <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{item.name}</td>

                                                        {/* Display multiple images */}
                                                        <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">
                                                            <div className="flex flex-wrap justify-center gap-2">
                                                                {item.images.map((img, idx) => (
                                                                    <img
                                                                        key={idx}
                                                                        src={img}
                                                                        alt={item.name}
                                                                        height={50}
                                                                        width={50}
                                                                        className="rounded-md shadow-sm"
                                                                    />
                                                                ))}
                                                            </div>
                                                        </td>

                                                        <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{item.mainDesc || "no description"}</td>
                                                        <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">
                                                            <button className='btn btn-circle bg-golden dark:bg-yellow-600 hover:bg-yellow-700 dark:hover:bg-yellow-500 text-black' onClick={() => {
                                                                document.getElementById("variant").showModal()
                                                                setVarients(item.varient)
                                                            }}>open</button>
                                                        </td>
                                                        {/* <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{item.material}</td> */}
                                                        {/* <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{item.productType}</td> */}
                                                        {/* <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{item.purity}</td> */}

                                                        <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setOpen(true)
                                                                    setEditData(item);
                                                                }}
                                                                className="btn bg-green-300 dark:bg-green-500 hover:bg-green-400 dark:hover:bg-green-400 transition"
                                                            >
                                                                Manage
                                                            </button>

                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="sm:hidden grid grid-cols-1 gap-4 m-5">
                                {/* Card View */}
                                {data && data.map((item) => {
                                    if (!item.isDelete) {
                                        return (
                                            <div key={item._id} className="bg-light-golden dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                                <div className="text-center">
                                                    {/* Display all images */}
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {item.images.map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={image}
                                                                height={100}
                                                                width={100}
                                                                alt={item.name}
                                                                className="rounded-md mb-2"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">{item.name}</h4>
                                                <p className="mb-2 text-gray-800 dark:text-gray-200">Description: {item.mainDesc || "No description"}</p>

                                                {/* Add a button to open the variants modal */}
                                                <button
                                                    className="btn bg-golden dark:bg-yellow-600 hover:bg-yellow-700 dark:hover:bg-yellow-500 mt-2"
                                                    onClick={() => {
                                                        document.getElementById("variant").showModal();
                                                        setVarients(item.varient);
                                                    }}>
                                                    View Variants
                                                </button>

                                                <div className="mt-4">
                                                    <p className="text-gray-800 dark:text-gray-200"><strong>Material:</strong> {item.material}</p>
                                                    <p className="text-gray-800 dark:text-gray-200"><strong>Type:</strong> {item.productType}</p>
                                                    <p className="text-gray-800 dark:text-gray-200"><strong>Purity:</strong> {item.purity}</p>
                                                    <div className="flex justify-between mt-2">
                                                        <button
                                                            onClick={() => {
                                                                document.getElementById('update').showModal();
                                                                setEditData(item);
                                                            }}
                                                            className="btn bg-green-300 dark:bg-green-500 hover:bg-green-400 dark:hover:bg-green-400 transition"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => deleteProduct(item._id)}
                                                            className="btn bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null; // Return null if item is deleted
                                })}
                            </div>
                        </>
                }


                {/* Update Modal */}


                {/* Update Modal End */}




                <dialog id="variant" className="modal modal-bottom sm:modal-middle mt-5">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Product Variants</h3>

                        {/* Check if variants exist */}
                        {varients && varients.length > 0 ? (
                            <div className="space-y-4 mt-2">
                                {varients.map((item, index) => (
                                    <div key={item._id} className="border p-4 rounded-md shadow-md bg-light-golden">
                                        <h4 className="font-semibold text-md">Variant {index + 1}</h4>
                                        <p><strong>Description:</strong> {item.desc}</p>
                                        <p><strong>Price:</strong> ${item.price}</p>
                                        <p><strong>MRP:</strong> ${item.mrp}</p>
                                        <p><strong>Height:</strong> {item.height}</p>
                                        <p><strong>Width:</strong> {item.width}</p>
                                        <p><strong>Weight:</strong> {item.prductWeight}</p>
                                        <p><strong>Quantity Available:</strong> {item.quantity}</p>
                                    </div>
                                ))}
                                <div className='text-right'>

                                    <button className='btn bg-golden ' onClick={() => document.getElementById("variant").close()}> Close</button>
                                </div>
                            </div>
                        ) : <>
                            <p className="mt-4 text-gray-600">No variants available for this product.</p>
                            <div className='text-right'>

                                <button className='btn bg-golden ' onClick={() => document.getElementById("variant").close()}> Close</button>
                            </div>
                        </>

                        }
                    </div>


                </dialog>

            </div>
        </div>
    </>
}


// eslint-disable-next-line react/prop-types
const Check = ({ data, setOpen, setSelectedDate, selectedDate, setTimerStarted }) => {
    // eslint-disable-next-line no-unused-vars
    const [schedule, { isSuccess }] = useSetScheduleMutation();
    const [discounts, setDiscounts] = useState([]);

    // console.log(selectedDate);



    const handleDiscountChange = (variantId, value) => {
        setDiscounts((prev) => {
            const existingDiscount = prev.find((item) => item.vId === variantId);
            if (existingDiscount) {
                return prev.map((item) =>
                    item.vId === variantId ? { ...item, discount: value } : item
                );
            } else {
                return [...prev, { vId: variantId, discount: value }];
            }
        });
    };
    console.log("data", data);


    if (data) {
        return (
            <>
                <h3 className="font-bold text-2xl text-center mb-6">Schedule Product</h3>


                <div className="mb-6 p-4 bg-light-golden dark:bg-gray-800 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-light-golden dark:bg-gray-400 rounded-lg">
                            <h4 className="font-bold text-lg mb-4">Variants</h4>
                            {data.varient.map((variant, i) => (
                                <div key={variant._id} className="my-2 border-b pb-2 last:border-none">
                                    <p className="font-bold m-2">{i + 1})</p>
                                    <p className="font-semibold">{variant.desc}</p>
                                    <p className="text-gray-700">MRP: ₹{variant.mrp}</p>
                                    <p className="text-gray-700">Price: ₹{variant.price}</p>
                                    <p className="text-gray-700">Quantity: {variant.quantity}</p>
                                    <p className="text-gray-700">Dimensions: {variant.height} x {variant.width}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-light-golden dark:bg-gray-400 rounded-lg">
                            <h4 className="font-bold text-lg mb-4">Set Discount</h4>
                            {data.varient.map((variant, i) => (
                                <div key={variant._id} className="my-4">
                                    <p className="font-bold m-2">{i + 1})</p>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`discount-${i}`}>
                                        Discount for {variant.price} (%)
                                    </label>
                                    <input
                                        type="number"
                                        id={`discount-${i}`}
                                        placeholder="Enter discount percentage"
                                        onChange={(e) => handleDiscountChange(variant._id, e.target.value)} // Update discount state
                                        className="input input-bordered input-warning text-warning-content bg-light-golden dark:bg-gray-200 w-full border-golden dark:border-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-gray-600 my-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="my-4 text-center" >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start-date">
                        Select Start Date and Time
                    </label>
                    <input
                        onChange={e => setSelectedDate({ ...selectedDate, startDate: e.target.value })}
                        id="start-date"
                        type="datetime-local"
                        className="input input-bordered input-warning text-warning-content bg-light-golden dark:bg-gray-300 w-50 border-yellow-500 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-gray-300 my-2"
                    />
                </div>

                <div className="my-4 text-center">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end-date">
                        Select End Date and Time
                    </label>
                    <input
                        onChange={e => setSelectedDate({ ...selectedDate, endDate: e.target.value })}
                        id="end-date"
                        type="datetime-local"
                        className="input input-bordered input-warning text-warning-content bg-light-golden dark:bg-gray-300 w-50 border-yellow-500 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-gray-300  my-2"
                    />
                </div>

                <div className="flex justify-evenly mb-10">
                    <button
                        className="btn bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </button>
                    <button
                        className="btn bg-yellow-500 hover:bg-yellow-600 text-white"
                        onClick={() => {


                            const scheduleData = {
                                startDate: selectedDate.startDate,
                                endDate: selectedDate.endDate,
                                discounts,
                                pId: data._id
                            };

                            // console.log(sche duleData);
                            schedule(scheduleData);
                            setOpen(false)
                            // Start the countdown timer
                            setTimerStarted(true);
                        }}
                    >
                        Add Schedule
                    </button>
                </div >
            </>
        );
    }

    return null;
};

export default Schedule
