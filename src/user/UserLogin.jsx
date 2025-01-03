/* eslint-disable react/no-unescaped-entities */
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLoginUserMutation } from '../redux/apis/userAuthApi';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { usePostHistoryMutation } from '../redux/apis/openApi';

const UserLogin = () => {
    const { user } = useSelector(state => state.userData);
    const [postHistory] = usePostHistoryMutation();
    const [loginUser, { isSuccess, isLoading }] = useLoginUserMutation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email().required("Enter Your Email"),
            password: yup.string().required("Enter Your Password"),
        }),
        onSubmit: (values, { resetForm }) => {
            loginUser(values);
            resetForm();
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("User Login Success");
            postHistory({ userId: user._id, type: "login" });
            navigate("/");
        }
    }, [isSuccess, navigate, postHistory, user]);

    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center p-5 bg-light-golden dark:bg-gray-800">
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            ) : (
                <motion.div
                    className="flex flex-col bg-light-golden dark:bg-gray-900"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="flex justify-center sm:mb-20 md:mb-24 pb-20 md:pb-14">
                        <motion.div
                            className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 mt-10 sm:px-10 sm:py-6 bg-white dark:bg-gray-800 rounded-lg shadow-md lg:shadow-lg"
                            variants={containerVariants}
                        >
                            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800 dark:text-white">
                                User Login
                            </h2>

                            <form className="mt-10" onSubmit={formik.handleSubmit}>
                                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase p-2 dark:text-gray-300">Email</label>
                                <input
                                    {...formik.getFieldProps("email")}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="input input-bordered input-warning w-full bg-light-golden dark:bg-gray-200 dark:border-white"
                                    required
                                />

                                <label htmlFor="password" className="block text-xs font-semibold text-gray-600 uppercase p-2 dark:text-gray-300">Password</label>
                                <input
                                    {...formik.getFieldProps("password")}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    className="input input-bordered input-warning w-full bg-light-golden dark:bg-gray-200 dark:border-white"
                                    required
                                />

                                <motion.button
                                    type="submit"
                                    className="w-full btn font-bold mt-5 bg-yellow-200 dark:bg-gray-700 dark:text-white rounded-lg text-2xl uppercase focus:outline-none hover:bg-yellow-500 dark:hover:bg-gray-600"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.button>
                            </form>

                            <div className="mt-5 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Don't have an account?
                                    <Link to="/user/register" className="text-yellow-500 hover:underline">Sign Up</Link>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default UserLogin;
