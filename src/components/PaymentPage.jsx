import React, { useEffect, useState } from 'react';
import { useCart } from '../App';
import { useCreateOrderMutation, useDeleteFullCartMutation, useGetAllPaymentMethodUserQuery, useRazorpayMutation, useVerifyPaymentMutation } from '../redux/apis/userApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetTaxesQuery, usePostHistoryMutation } from '../redux/apis/openApi';
import BottomNav from '../user/BottomNav';
import useScrollRestoration from '../hooks/useScrollRestoration';

const PaymentPage = () => {
    useScrollRestoration()
    const [raz, { isSuccess: razSuccess, data, isLoading }] = useRazorpayMutation();
    const { data: paymentMethods } = useGetAllPaymentMethodUserQuery();
    const [initiate, { isSuccess: initiateSuccess, isLoading: initiateLoading }] = useVerifyPaymentMutation();
    const { user } = useSelector(state => state.userData);
    const [createOrder, { isSuccess, isLoading: codLoading }] = useCreateOrderMutation();
    const { cartData, setCartData } = useCart();
    const [deleteFull, { isSuccess: deleteSuccess }] = useDeleteFullCartMutation();
    const [postHistory] = usePostHistoryMutation()
    const [paymentMethod, setPaymentMethod] = useState('');

    // Fetch and set taxes
    const { data: taxes } = useGetTaxesQuery();
    const [discount, setDiscount] = useState(0);
    const [makingCharges, setMakingCharges] = useState(0);
    const [salesTax, setSalesTax] = useState(0);

    useEffect(() => {
        if (taxes) {
            setDiscount(taxes.find(tax => tax.taxName === 'Discount')?.percent || 0);
            setMakingCharges(taxes.find(tax => tax.taxName === 'Making Charges')?.percent || 0);
            setSalesTax(taxes.find(tax => tax.taxName === 'Sales Tax')?.percent || 0);
        }
    }, [taxes]);

    // Calculate order totals
    const subtotal = cartData.subtotal || 0;
    const calculateDiscount = (amount) => amount * (discount / 100);
    const totalAfterDiscount = subtotal - calculateDiscount(subtotal);
    const makingChargesAmount = totalAfterDiscount * (makingCharges / 100);
    const salesTaxAmount = totalAfterDiscount * (salesTax / 100);
    const totalWithTaxAndCharges = totalAfterDiscount + makingChargesAmount + salesTaxAmount;

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderData = {
            deliveryAddressId: cartData.deliveryAddressId,
            paymentMethod,
            subtotal: cartData.subtotal,
            orderItems: cartData.cartItems.map(item => ({
                _id: item.productId._id,
                quantity: item.quantity,
                varientId: item.productId.varient._id
            })),
        };

        if (paymentMethod === 'razorpay') {
            raz({
                ...orderData, userId: user._id, currency: "INR",
                receipt: `${user._id}${user.name}`,
                subtotal: totalWithTaxAndCharges.toFixed(2)
            });
        } else {
            createOrder({
                ...orderData,
                userId: user._id,
                orderItems: cartData.cartItems.map(item => ({
                    _id: item.productId._id,
                    quantity: item.quantity,
                    varientId: item.productId.varient._id
                })),
            });
        }
    };

    useEffect(() => {
        if (razSuccess) {
            const razor = new window.Razorpay({
                key: import.meta.env.VITE_RAZORPAY_API_KEY,
                amount: data.amount * 100,
                name: user.name,
                currency: "INR",
                order_id: data.id,
                prefill: {
                    name: user && user.name,
                    email: user && user.email,
                    contact: user && user.contact
                },
                theme: {
                    color: "#f9f2e8"
                },
                handler: res => initiate({
                    ...res, amount: data.amount,
                    deliveryAddressId: cartData.deliveryAddressId,
                    paymentMethod: paymentMethod,
                    userId: user._id,
                    orderItems: cartData.cartItems.map(item => ({
                        _id: item.productId._id,
                        quantity: item.quantity,
                        varientId: item.productId.varient._id
                    })),
                }),
            });
            razor.on('payment.failed', (res) => {
                console.log('Payment Failed: ' + res.error.description);
            });
            razor.open();
        }
    }, [razSuccess, data]);

    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess || initiateSuccess) {
            toast.success("Order placed successfully! Thank you.");
            if (cartData.cartItems.length > 1) {
                deleteFull({ userId: user._id });
            }
            setCartData({});
            navigate("/");
            localStorage.removeItem("cartData");
        }
    }, [isSuccess, initiateSuccess]);

    useEffect(() => {
        if (deleteSuccess) {
            navigate("/");
        }
    }, [deleteSuccess]);

    useEffect(() => {
        if (user) {
            postHistory({ userId: user._id, type: "paymentPage" })
        }
    }, [])

    return (
        <div className="pt-5 bg-light-golden dark:bg-gray-900 pb-24">
            {isLoading || codLoading || initiateLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                    <div className="text-white text-lg">Loading...</div>
                </div>
            ) : (
                <>
                    <h1 className="mb-10 text-center text-3xl font-extrabold text-gray-800 dark:text-gray-200">Payment Options</h1>
                    <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
                        {/* Order Summary Section */}
                        <div className="mt-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl md:w-1/3 md:mt-0">
                            <div className="mb-4 text-center">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Order Summary</h2>
                            </div>
                            <div className="flex justify-between border-b pb-4">
                                <p className="text-gray-700 dark:text-gray-400">Subtotal</p>
                                <p className="text-gray-700 dark:text-gray-400">₹{subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between border-b py-4">
                                <p className="text-gray-700 dark:text-gray-400">Discount ({discount}%)</p>
                                <p className="text-gray-700 dark:text-gray-400">-₹{calculateDiscount(subtotal).toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between border-b py-4">
                                <p className="text-gray-700 dark:text-gray-400">Making Charges ({makingCharges}%)</p>
                                <p className="text-gray-700 dark:text-gray-400">+₹{makingChargesAmount.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between border-b py-4">
                                <p className="text-gray-700 dark:text-gray-400">Sales Tax ({salesTax}%)</p>
                                <p className="text-gray-700 dark:text-gray-400">+₹{salesTaxAmount.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between border-b py-4">
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total</p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">₹{totalWithTaxAndCharges.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Payment Method Section */}
                        <div className="md:w-2/3 pt-5">
                            <form onSubmit={handleSubmit} className="mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Choose a Payment Method</h2>
                                <div className="my-4 flex items-center">
                                    <input
                                        type="radio"
                                        id="cod"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={handlePaymentMethodChange}
                                        className="form-radio size-6"
                                        disabled={!paymentMethods?.find(pm => pm.method === 'cod' && pm.active)}
                                    />
                                    <label htmlFor="cod" className="ml-2 text-gray-700 dark:text-gray-400 text-lg">Cash On Delivery</label>
                                </div>
                                <div className="my-4 flex items-center">
                                    <input
                                        type="radio"
                                        id="razorpay"
                                        name="paymentMethod"
                                        value="razorpay"
                                        checked={paymentMethod === 'razorpay'}
                                        onChange={handlePaymentMethodChange}
                                        className="form-radio size-6"
                                        disabled={!paymentMethods?.find(pm => pm.method === 'razorpay' && pm.active)}
                                    />
                                    <label htmlFor="razorpay" className="ml-2 text-gray-700 dark:text-gray-400 text-lg">Razorpay</label>
                                </div>
                                <button
                                    type="submit"
                                    className="mt-6 w-full rounded-md bg-yellow-500 py-2 text-lg font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-500"
                                >
                                    Pay Now
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
            <BottomNav />
        </div>
    );
};

export default PaymentPage;
