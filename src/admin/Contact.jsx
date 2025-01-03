import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
// import { usePostContactQuery } from '../redux/apis/openApi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import { usePostContactMutation } from '../redux/apis/openApi';

const Contact = () => {
    const [postContact, { isSuccess, isError, error }] = usePostContactMutation()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            email: yup.string().required("Enter email").email(),
            subject: yup.string().required("Enter subject"),
            message: yup.string().required("Enter message"),
        }),
        onSubmit: (values, { resetForm }) => {
            postContact(values)
            resetForm()
        }
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success("Message Sent Success To Admin")
        }
    }, [isSuccess])

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-900 py-6 sm:py-12">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 max-w-4xl mx-auto w-full shadow-lg rounded-lg"
            >
                <div className="grid grid-cols-1 md:grid-cols-6 h-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-amber-900 p-10 md:col-span-2 rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                    >
                        <h2 className="mb-10 font-bold text-2xl text-amber-100 ">
                            SF JWELLERS
                        </h2>
                        <p className="font-bold text-amber-100 py-8 border-b border-amber-700">
                            Location Address
                            <span className="font-normal text-xs text-amber-300 block">Kranti Chowk</span>
                        </p>
                        <p className="font-bold text-amber-100 py-8 border-b border-amber-700">
                            Phone Number
                            <span className="font-normal text-xs text-amber-300 block">+91 9960 669 724</span>
                        </p>
                        <p className="font-bold text-amber-100 py-8 border-b border-amber-700">
                            Email Address
                            <span className="font-normal text-xs text-amber-300 block">faizuddinshaikh55@gmail.com</span>
                        </p>
                        <p className="font-bold text-amber-100 py-8 border-b border-amber-700">
                            Web Address
                            <span className="font-normal text-xs text-amber-300 block">www.example.com</span>
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gray-700 p-14 md:col-span-4 rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
                    >
                        <h2 className="mb-14 font-bold text-4xl text-amber-500">
                            Contact Us
                        </h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col my-4">
                                <input {...formik.getFieldProps("name")} className="py-4 bg-gray-800 rounded-full px-6 placeholder:text-xs text-amber-100 border border-amber-700" placeholder="Enter Name" />
                            </div>

                            <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
                                <div className="flex flex-col">
                                    <input {...formik.getFieldProps("email")} className="py-4 bg-gray-800 rounded-full px-6 placeholder:text-xs text-amber-100 border border-amber-700" placeholder="Email Address" />
                                </div>
                                <div className="flex flex-col">
                                    <input {...formik.getFieldProps("subject")} className="py-4 bg-gray-800 rounded-full px-6 placeholder:text-xs text-amber-100 border border-amber-700" placeholder="Subject" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <textarea {...formik.getFieldProps("message")} className="w-full bg-gray-800 rounded-2xl placeholder:text-xs px-6 py-4 text-amber-100 border border-amber-700" placeholder="Your message here" rows="8"></textarea>
                            </div>
                            <div className="flex justify-center">
                                <button type='submit' className="rounded-full bg-amber-900 text-white font-bold py-4 px-6 min-w-40 hover:bg-amber-800 transition-all">
                                    Send
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>

    );
}

export default Contact;
