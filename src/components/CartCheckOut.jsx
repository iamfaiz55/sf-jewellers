import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useSelector } from 'react-redux';
import { useAddAddressMutation, useGetAddressesQuery } from '../redux/apis/userApi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useCart } from '../App';
import { useNavigate } from 'react-router-dom';
import { useGetTaxesQuery, usePostHistoryMutation } from '../redux/apis/openApi';
import BottomNav from '../user/BottomNav';
import useScrollRestoration from '../hooks/useScrollRestoration';


const CartCheckOut = () => {
    useScrollRestoration()
    const [postHistory] = usePostHistoryMutation()

    const { cartData, setCartData } = useCart();
    const { user } = useSelector(state => state.userData);
    const { data: addresses } = useGetAddressesQuery(user._id);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const navigate = useNavigate();
    const { data: taxes } = useGetTaxesQuery();
    console.log(cartData);
    const finalData = cartData && cartData.cartItems.map(item => {
        const x = item.productId.varient.find(v => v._id == item.varientId)


        return { ...item, varient: x }
    })
    // console.log(finalData);

    const salesTax = taxes?.find(tax => tax.taxName === 'Sales Tax')?.percent || 0;
    const discount = taxes?.find(tax => tax.taxName === 'Discount')?.percent || 0;
    const makingCharges = taxes?.find(tax => tax.taxName === 'Making Charges')?.percent || 0;

    const totalProductPrice = cartData.cartItems.reduce((acc, item) => {
        const variant = item.productId.varient.find(v => v._id === item.varientId);
        const variantPrice = variant ? Number(variant.price) : 0;
        return acc + (variantPrice * item.quantity);
    }, 0);

    const totalAfterDiscount = totalProductPrice - (totalProductPrice * (discount / 100));
    const makingChargesAmount = totalAfterDiscount * (makingCharges / 100);
    const salesTaxAmount = totalAfterDiscount * (salesTax / 100);
    const total = totalAfterDiscount + makingChargesAmount + salesTaxAmount;

    const handleAddressChange = (addressId) => {
        setSelectedAddress(addressId);
    };

    const handlePayNow = () => {
        if (selectedAddress) {
            const totalInCents = Math.round(total);
            setCartData(prevData => ({
                ...prevData,
                subtotal: totalInCents,
                deliveryAddressId: selectedAddress,
                cartItems: finalData
            }));
            navigate("/user/payment");
        } else {
            toast.error("Please select an address before proceeding.");
        }
    };
    // console.log(cartData);
    useEffect(() => {
        if (user) {
            // postHistory({ userId: user._id, type: "checkout", productId: id })
        }
    }, [])

    return (
        <div className="flex flex-col  bg-light-golden dark:bg-gray-800">
            {/* Header Section */}
            <header className="bg-golden text-white p-4">
                <h1 className="text-2xl font-bold">Checkout</h1>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-4 flex flex-col md:flex-row bg-light-golden dark:bg-gray-800 pb-24">
                {/* Checkout Details */}
                <div className="flex-grow bg-yellow-50 p-4 space-y-8 overflow-y-auto  dark:bg-gray-800">
                    <div className="p-4 bg-white shadow rounded-md">
                        <div className="text-sm mt-4 text-gray-500">Complete your shipping and payment details below.</div>
                    </div>

                    <button className="btn bg-yellow-400 text-black hover:bg-yellow-500 mb-4" onClick={() => document.getElementById('add').showModal()}>
                        Add Address
                    </button>
                    <dialog id="add" className="modal">
                        <div className="modal-box bg-yellow-50">
                            <h3 className="font-bold text-lg text-yellow-800">Add Address</h3>
                            <Form />
                        </div>
                    </dialog>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
                        {addresses && addresses.map((item) => (
                            <div key={item._id} className="overflow-hidden  group relative rounded-lg p-1 flex  justify-center items-center">
                                <label className="relative z-10 w-full bg-white  dark:bg-gray-800 p-6 rounded-lg flex items-center cursor-pointer ">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500" checked={selectedAddress === item._id} onChange={() => handleAddressChange(item._id)} />
                                    <div className="ml-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.addressType}</h3>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-white">House {item.houseNo}</p>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-white">City: {item.city}</p>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-white">Country: {item.country}</p>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-white">State: {item.state}</p>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-white">Pincode: {item.pincode}</p>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-white">Mobile: {item.mobile}</p>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>

                    <button onClick={handlePayNow} className="submit-button px-4 py-3 rounded-full bg-yellow-400 text-white w-full text-xl font-semibold transition-colors hover:bg-yellow-500 mt-4">
                        Pay Now
                    </button>
                </div>

                {/* Order Summary */}
                <div className="hidden md:w-1/3 md:block bg-white p-4 md:ml-4 shadow-md rounded-md  dark:bg-gray-800">
                    <h2 className="text-xl font-semibold text-yellow-800 mb-4 dark:text-white">Order Summary</h2>
                    <ul>
                        {cartData.cartItems.map(item => {
                            const variant = item.productId.varient.find(v => v._id === item.varientId);
                            const variantPrice = variant ? Number(variant.price) : 0;
                            const discountedPrice = variantPrice * (1 - (discount / 100));
                            return (
                                <li key={item.productId._id} className="flex items-center justify-between border-b py-2">
                                    <div className="flex items-center">
                                        <img src={item.productId.images[0]} alt={item.name} className="w-16 h-16 rounded object-cover mr-4" />
                                        <div className="text-sm">
                                            <h3 className="font-medium text-gray-900 dark:text-white" >{item.name}</h3>
                                            <p className="text-gray-500 dark:text-white" >₹{discountedPrice.toFixed(2)} x {item.quantity}</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-4 border-t pt-4 text-sm">
                        <div className="flex justify-between py-2 text-gray-600 dark:text-white">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-500">₹{totalProductPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-2 text-gray-600 dark:text-white">
                            <span>Discount</span>
                            <span className="font-semibold text-gray-500 dark:text-white">-₹{(totalProductPrice * (discount / 100)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-2 text-gray-600 dark:text-white">
                            <span>Making Charges</span>
                            <span className="font-semibold text-gray-500 dark:text-white">+₹{makingChargesAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-2 text-gray-600 dark:text-white">
                            <span>Sales Tax</span>
                            <span className="font-semibold text-gray-500 dark:text-white">+₹{salesTaxAmount.toFixed(2)}</span>
                        </div>
                        <div className="font-semibold text-xl flex justify-between py-4 text-gray-600 dark:text-white">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
};




const Form = ({ edit }) => {
    const { user } = useSelector((state) => state.userData);
    const [addAddress, { isSuccess, isLoading }] = useAddAddressMutation();
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
        },
        validationSchema: yup.object({
            pincode: yup.string().required("Pincode is required"),
            houseNo: yup.string().required("House No is required"),
            city: yup.string().required("City is required"),
            state: yup.string().required("State is required"),
            country: yup.string().required("Country is required"),
            addressType: yup.string().required("Address Type is required"),
            mobile: yup.string().required("Mobile is required"),
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
            toast.success("Address Added Successfully");
            document.getElementById("add").close();
        }
    }, [isSuccess]);

    return (
        <>
            {isLoading ? (
                <div className="flex  items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
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

export default CartCheckOut;
