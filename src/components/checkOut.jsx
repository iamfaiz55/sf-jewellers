import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddAddressMutation, useGetAddressesQuery } from '../redux/apis/userApi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart, useProduct } from '../App';
import { useGetDetailsQuery, useGetTaxesQuery, usePostHistoryMutation } from '../redux/apis/openApi';
import BottomNav from '../user/BottomNav';
import useScrollRestoration from '../hooks/useScrollRestoration';

const CheckOut = () => {
    useScrollRestoration()
    const [postHistory] = usePostHistoryMutation()

    const { selectedProd, setselectedProd } = useProduct()
    const { cartData, setCartData } = useCart();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { data: taxes } = useGetTaxesQuery();
    const { user } = useSelector(state => state.userData);
    const { data: addresses, error: addressError } = useGetAddressesQuery(user && user._id);
    const { id } = useParams();

    const { data: product, error, isError } = useGetDetailsQuery(id);
    const navigate = useNavigate();
    // console.log("product ", product);
    // console.log("selected prod ", selectedProd);

    const [quantity, setQuantity] = useState(1);
    const discount = taxes && taxes.find(tax => tax.taxName === 'Discount');
    const salesTax = taxes && taxes.find(tax => tax.taxName === 'Sales Tax');
    const makingCharges = taxes && taxes.find(tax => tax.taxName === 'Making Charges');

    // const originalPrice = product ? parseFloat(product.price) : 0;
    const originalPrice = selectedProd && selectedProd.varient.price ? parseFloat(selectedProd.varient.price) : 0;
    const discountPercent = discount ? discount.percent : 0;
    const salesTaxPercent = salesTax ? salesTax.percent : 0;
    const makingChargesPercent = makingCharges ? makingCharges.percent : 0;

    const discountedPrice = originalPrice * (1 - discountPercent / 100);
    const subtotal = quantity * discountedPrice;
    const makingChargesAmount = subtotal * (makingChargesPercent / 100);
    const salesTaxAmount = subtotal * (salesTaxPercent / 100);
    const total = subtotal + makingChargesAmount + salesTaxAmount;
    // console.log(product);
    // console.log(selectedProd);
    // console.log("qty", quantity);

    const handlePayNow = () => {
        if (selectedAddress) {
            setCartData({
                ...cartData,
                deliveryAddressId: selectedAddress,
                subtotal: total,
                cartItems: [{ productId: selectedProd, quantity, varientId: selectedProd.varient?._id }],
            });
            navigate("/user/payment");
        } else {
            toast.error("Please select an address before proceeding.");
        }
    };

    const plus = () => setQuantity(prev => prev + 1);
    const minus = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

    const handleAddressChange = (addressId) => setSelectedAddress(addressId);

    useEffect(() => {
        if (error) {
            toast.error(error.data.message);
        }
    }, [error]);

    useEffect(() => {
        if (user) {
            postHistory({ userId: user._id, type: "checkout", productId: id })
        }
    }, [])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-light-golden dark:bg-gray-800"> {/* Light and dark backgrounds */}
                {/* Order Summary on Small Screens */}
                <div className="md:hidden col-span-1 bg-light-golden dark:bg-gray-700 p-4 rounded-lg"> {/* Adaptive background */}
                    <h1 className="py-6 border-b-2 text-xl text-yellow-500 dark:text-yellow-400">Order Summary</h1>
                    {product && (
                        <>
                            <ul className="py-6 border-b space-y-6">
                                <li className="flex items-center space-x-4 border-b pb-4">
                                    <div className="w-24">
                                        <img src={product.images[0]} alt={product.name} className="rounded w-full" />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <span className="text-gray-900 dark:text-gray-300 text-md font-semibold">{product.name}</span>
                                        <span className="text-gray-700 dark:text-gray-400 text-sm">{product.productType}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={minus} className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-0 py-1 px-3 rounded-l">-</button>
                                        <span className="text-gray-900 dark:text-gray-200 px-3">{quantity}</span>
                                        <button onClick={plus} className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-0 py-1 px-3 rounded-r">+</button>
                                    </div>
                                </li>
                            </ul>
                            <div className="pt-4">
                                <div className="flex justify-between py-2 text-gray-700 dark:text-gray-400">
                                    <span>Original Price</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">${originalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-700 dark:text-gray-400">
                                    <span>Discount ({discountPercent}%)</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">-${(originalPrice * discountPercent / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-700 dark:text-gray-400">
                                    <span>Discounted Price</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">${discountedPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-700 dark:text-gray-400">
                                    <span>Making Charges ({makingChargesPercent}%)</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">${makingChargesAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-700 dark:text-gray-400">
                                    <span>Sales Tax ({salesTaxPercent}%)</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">${salesTaxAmount.toFixed(2)}</span>
                                </div>
                                <div className="font-semibold text-xl flex justify-between py-4 text-gray-900 dark:text-gray-200">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Main Checkout Section */}
                <div className="md:col-span-2 bg-light-golden dark:bg-gray-700 p-4 space-y-8 mb-20 md:mb-0 rounded-lg">
                    <div className="p-4 bg-golden text-gray-900 dark:text-black shadow rounded-md">
                        <div className="flex items-center border-b pb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="ml-3 text-sm font-medium">Checkout</span>
                        </div>
                        <div className="text-sm mt-4">Complete your shipping and payment details below.</div>
                    </div>

                    {isError ? (
                        <div className='text-center font-bold text-3xl text-red-500'>{error.data.message}</div>
                    ) : (
                        <>
                            <button className="btn bg-yellow-500 dark:bg-yellow-600 text-black hover:bg-yellow-600 dark:hover:bg-yellow-700 z-1" onClick={() => document.getElementById('add').showModal()}>
                                Add Address
                            </button>
                            <dialog id="add" className="modal">
                                <div className="modal-box bg-gray-800 text-gray-200">
                                    <h3 className="font-bold text-lg text-yellow-400">Add Address</h3>
                                    <Form />
                                </div>
                            </dialog>

                            {/* Address List with Checkbox */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {addresses && addresses.map((item) => (
                                    <div key={item._id} className="overflow-hidden group relative rounded-lg p-1 flex justify-center items-center">
                                        <label className="relative z-10 w-full bg-light-golden  border-2 border-black dark:bg-gray-700 p-6 rounded-lg flex items-center cursor-pointer">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500" checked={selectedAddress === item._id} onChange={() => handleAddressChange(item._id)} />
                                            <div className="ml-4 text-gray-900 dark:text-gray-200">
                                                <h3 className="text-xl font-bold">{item.addressType}</h3>
                                                <p className="mt-2 text-sm">{`House ${item.houseNo}`}</p>
                                                <p className="mt-2 text-sm">{`Country ${item.country}`}</p>
                                                <p className="mt-2 text-sm">{`State ${item.state}`}</p>
                                                <p className="mt-2 text-sm">{`Pincode ${item.pincode}`}</p>
                                                <p className="mt-2 text-sm">{`Mobile ${item.mobile}`}</p>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button onClick={handlePayNow} className="submit-button px-4 py-3 rounded-full bg-yellow-500 dark:bg-yellow-600 text-white w-full text-xl font-semibold transition-colors hover:bg-yellow-600 dark:hover:bg-yellow-700 mt-4">
                                Pay Now
                            </button>
                        </>
                    )}
                </div>

                {/* Order Summary on Large Screens */}
                <div className="hidden md:block md:col-span-1 bg-light-golden dark:bg-gray-700 p-4 rounded-lg">
                    <h1 className="py-6 border-b-2 text-xl text-yellow-500 dark:text-yellow-400">Order Summary</h1>
                    {product && (
                        <>
                            <ul className="py-6 border-b space-y-6">
                                <li className="flex items-center space-x-4 border-b pb-4">
                                    <div className="w-24">
                                        <img src={product.images[0]} alt={product.name} className="rounded w-full" />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <span className="text-gray-900 dark:text-gray-300 text-md font-semibold">{product.name}</span>
                                        <span className="text-gray-700 dark:text-gray-400 text-sm">{product.productType}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={minus} className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-0 py-1 px-3 rounded-l">-</button>
                                        <span className="text-gray-900 dark:text-gray-200 px-3">{quantity}</span>
                                        <button onClick={plus} className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-0 py-1 px-3 rounded-r">+</button>
                                    </div>
                                </li>
                            </ul>
                            <div className="pt-4">
                                <div className="flex justify-between py-2 text-gray-700 dark:text-gray-400">
                                    <span>Original Price</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">${originalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-700 dark:text-gray-400">
                                    <span>Discount ({discountPercent}%)</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">-${(originalPrice * discountPercent / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-700 dark:text-gray-400">
                                    <span>Discounted Price</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">${discountedPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-700 dark:text-gray-400">
                                    <span>Making Charges ({makingChargesPercent}%)</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">${makingChargesAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-700 dark:text-gray-400">
                                    <span>Sales Tax ({salesTaxPercent}%)</span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">${salesTaxAmount.toFixed(2)}</span>
                                </div>
                                <div className="font-semibold text-xl flex justify-between py-4 text-gray-900 dark:text-gray-200">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <BottomNav />
            </div>


        </>
    );
};
``

const Form = ({ edit }) => {
    const { user } = useSelector((state) => state.userData);
    const [addAddress, { isSuccess, isLoading }] = useAddAddressMutation();
    // console.log(user);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: edit || {
            pincode: "",
            houseNo: "",
            city: "",
            state: "",
            country: "",
            addressType: "",
            mobile: "",
            email: "",
            adddress: "",
        },
        validationSchema: yup.object({
            pincode: yup.string().required("Enter pincode"),
            houseNo: yup.string().required("Enter houseNo"),
            city: yup.string().required("Enter city"),
            state: yup.string().required("Enter state"),
            country: yup.string().required("Enter country"),
            addressType: yup.string().required("Select address type"),
            mobile: yup.string().required("Enter mobile number"),
            email: yup.string()
        }),
        onSubmit: (values, { resetForm }) => {
            if (!user.email) {
                const x = localStorage.getItem("user")
                const y = JSON.parse(x)
                const z = { ...y, email: values.email }
                localStorage.setItem("user", JSON.stringify(z))
            }
            addAddress({ ...values, userId: user._id });
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Address added successfully");
            document.getElementById("add").close();
        }
    }, [isSuccess]);



    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <input {...formik.getFieldProps("houseNo")} type="text" placeholder="House No." className="input w-full my-2" />
                    <input {...formik.getFieldProps("state")} type="text" placeholder="State" className="input w-full my-2" />
                    <input {...formik.getFieldProps("city")} type="text" placeholder="City" className="input w-full my-2" />
                    <input {...formik.getFieldProps("pincode")} type="number" placeholder="Pincode" className="input w-full my-2" />
                    <input {...formik.getFieldProps("country")} type="text" placeholder="Country" className="input w-full my-2" />
                    <input {...formik.getFieldProps("mobile")} type="number" placeholder="Mobile" className="input w-full my-2" />
                    <input {...formik.getFieldProps("address")} type="string" placeholder="Address" className="input w-full my-2" />
                    {/* { */}
                    {/* // user && user.email */}
                    {/* // ? <></> */}
                    {/* // : <></> */}
                    {/* // } */}
                    <input disabled={user && user.email} {...formik.getFieldProps("email")} type="email" placeholder="Enter your email" className="input w-full my-2" />
                    <select {...formik.getFieldProps("addressType")} className="select select-bordered w-full my-2">
                        <option value="" disabled>Select Address Type</option>
                        <option value="home">Home</option>
                        <option value="office">Office</option>
                    </select>
                    <div className="modal-action">
                        <button type="submit" className="btn bg-gray-400 text-black">
                            {edit ? "Update" : "Add"} Address
                        </button>
                        <button type="button" onClick={() => document.getElementById(edit ? "update" : "add").close()} className="btn">
                            Close
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default CheckOut;
