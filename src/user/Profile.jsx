import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import * as yup from 'yup';
// import imageCompression from 'browser-image-compression';

import {

    useUpdateProfileDataMutation,

} from '../redux/apis/userApi';
import { useFormik } from 'formik';
import Liked from '../components/Liked';
import AllOrders from './AllOrders';
import { useLogoutUserMutation } from '../redux/apis/userAuthApi';
import BottomNav from './BottomNav';
// import { usePostHistoryMutation } from '../redux/apis/openApi';
import Addresses from './Addresses';
import { useUpdateProfileMutation } from '../redux/apis/userFormApi';

const Profile = () => {
    const [logoutUser, { isSuccess: logoutSuccess }] = useLogoutUserMutation()
    const [isSmallSidebarOpen, setIsSmallSidebarOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState('profile');
    const [updateProfile, { isSuccess, isLoading }] = useUpdateProfileMutation();
    const { user } = useSelector((state) => state.userData);
    const [isEditMode, setIsEditMode] = useState(false);

    const [updateProfileData, { isSuccess: updateSuccess }] = useUpdateProfileDataMutation()

    const fileInputRef = useRef();
    // const [postHistory] = usePostHistoryMutation()
    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleInput = (e) => {
        const file = e.target.files[0];


        const fd = new FormData();
        fd.append('images', file);
        fd.append('userId', user._id);
        // updateProfile(fd);

        updateProfile(fd);
    };


    const formik = useFormik({
        initialValues: {
            name: user && user.name ? user.name : "",
            email: user && user.email ? user.email : "",
            mobile: user && user.mobile ? user.mobile : "",
        },
        validationSchema: yup.object({
            name: yup.string(),
            mobile: yup.string(),
            email: yup.string()
        }),
        onSubmit: (values, { resetForm }) => {
            updateProfileData({ ...values, _id: user._id })
            resetForm()
            setIsEditMode(false);

        }
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success('Profile Update Success');
            // location.reload()
        }
    }, [isSuccess]);
    useEffect(() => {
        if (updateSuccess) {
            toast.success("Profile Update Success")
            // location.reload()
            // document.getElementById("update").close()
        }
    }, [updateSuccess])




    useEffect(() => {
        if (logoutSuccess) {
            toast.success("User Logout Success")
            // postHistory({ userId: user._id, type: "logout" })
        }
    }, [logoutSuccess])


    return (
        <div className="flex  bg-light-golden min-h-screen dark:bg-gray-800">
            {/* Sidebar */}
            <div className="hidden md:block inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-golden dark:bg-gray-800 rounded-lg m-2">
                <div className="flex flex-col items-center mt-20">
                    {
                        user && user.name && <h2 className="text-2xl font-bold text-white">Hi, {user.name}</h2>
                    }
                </div>

                <nav>
                    <SidebarButton
                        section="profile"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="addresses"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="liked"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="allOrders"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <div className="text-center">
                        <button onClick={() => logoutUser(user && user._id)} className='btn w-24 mt-16 bg-gray-600 text-white hover:bg-gray-700'>Logout</button>
                    </div>
                </nav>
            </div>

            <div onClick={() => setIsSmallSidebarOpen(!isSmallSidebarOpen)} className={`mt-24 mb-20 fixed inset-y-0 left-0 z-40 w-36 overflow-y-auto bg-golden rounded-lg m-2 transition-transform transform ${isSmallSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                <div className="flex flex-col items-center">
                    {/* <h2 className="text-2xl font-bold text-white">Hi, {user.mobile}</h2> */}
                </div>
                <nav>
                    <SidebarButton
                        section="profile"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="addresses"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="liked"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="allOrders"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <div className="text-center">
                        <button onClick={() => logoutUser(user && user._id)} className='btn  mt-12 bg-gray-600 text-white hover:bg-gray-700'>Logout</button>
                    </div>
                </nav>
            </div>


            <div className="flex flex-col flex-1 p-6 overflow-hidden  dark:bg-gray-900">
                {/* Toggle Button for Small Sidebar */}
                {/* {
                    !isSmallSidebarOpen && <button
                        aria-label={isSmallSidebarOpen ? 'Close menu' : 'Open menu'}
                        className="md:hidden p-2 text-sm fixed top-24 left-4 z-50 bg-golden text-white rounded-full transition duration-300 transform hover:scale-105"
                        onClick={() => setIsSmallSidebarOpen(!isSmallSidebarOpen)}
                    >
                        {isSmallSidebarOpen ? "" : 'Menu'}
                    </button>
                } */}


                <main className="flex-1  mb-10">
                    {currentSection === 'profile' && (
                        <div className="p-4 bg-light-golden rounded-lg shadow-md  dark:bg-gray-900">
                            <div className="flex flex-col items-center">
                                {isLoading ? (
                                    <span className="loading loading-spinner text-warning loading-lg"></span>
                                ) : (
                                    <motion.img
                                        src={user && user.image}
                                        className="w-24 h-24 rounded-full border-4 border-golden cursor-pointer mb-4"
                                        onClick={handleClick}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleInput}
                                    className="hidden"
                                />

                                <div className="text-center w-full">
                                    <button
                                        onClick={() => document.getElementById("update").showModal()}
                                        className="btn btn-sm bg-golden m-4  sm:w-auto text-black hover:text-white"
                                    >
                                        Edit Profile
                                    </button>
                                </div>

                                {/* <dialog id="update" className="modal border-yellow-400 rounded-lg">
                                    <div className="modal-box relative bg-light-golden text-black dark:text-white dark:bg-gray-900">
                                        {updateLoading ? (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                                                <div className="text-white text-lg">Loading...</div>
                                            </div>
                                        ) : (
                                            <>
                                                <h3 className="font-bold text-yellow-600 text-center mb-4 text-sm sm:text-base">
                                                    Update Profile
                                                </h3>

                                                <form onSubmit={formik.handleSubmit} className="space-y-3">
                                                    <input
                                                        {...formik.getFieldProps("name")}
                                                        type="text"
                                                        value={formik.values.name}
                                                        placeholder="Enter Your Name"
                                                        className="input input-bordered input-warning w-full dark:bg-gray-700 dark:text-white text-xs sm:text-sm"
                                                    />
                                                    <input
                                                        {...formik.getFieldProps("mobile")}
                                                        type="number"
                                                        value={formik.values.mobile}
                                                        placeholder="Enter Your Mobile Number"
                                                        className="input input-bordered input-warning w-full dark:bg-gray-700 dark:text-white text-xs sm:text-sm"
                                                    />
                                                    <input
                                                        {...formik.getFieldProps("email")}
                                                        type="email"
                                                        value={formik.values.email}
                                                        placeholder="Enter Your Email"
                                                        className="input input-bordered input-warning w-full dark:bg-gray-700 dark:text-white text-xs sm:text-sm"
                                                    />
                                                    <div className="flex flex-col sm:flex-row sm:justify-end mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
                                                        <button
                                                            type="submit"
                                                            className="btn bg-golden w-full sm:w-auto text-xs sm:text-sm"
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => document.getElementById("update").close()}
                                                            className="btn bg-gray-500 w-full sm:w-auto text-xs sm:text-sm"
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </form>
                                            </>
                                        )}
                                    </div>
                                </dialog> */}


                                <div className="mt-4 w-full">
                                    <div className="relative flex flex-col items-center rounded-[20px] w-full max-w-[700px] mx-auto bg-light-golden dark:bg-gray-800 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                            <div className="flex flex-col items-start justify-center rounded-2xl bg-golden dark:bg-gray-800 bg-clip-border px-4 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                                <p className="text-xs sm:text-sm text-black dark:text-gray-300">Name</p>
                                                {isEditMode ? (
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="text-xs sm:text-sm font-medium text-black dark:text-gray-300 w-full p-2 border rounded"
                                                        value={formik.values.name}
                                                        onChange={formik.handleChange}
                                                    />
                                                ) : (
                                                    <p className="text-xs sm:text-sm font-medium text-black dark:text-gray-300 overflow-hidden">
                                                        {user?.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col justify-center rounded-2xl bg-golden dark:bg-gray-800 bg-clip-border px-4 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                                <p className="text-xs sm:text-sm text-black dark:text-gray-300">Email</p>
                                                {isEditMode ? (
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="text-xs sm:text-sm font-medium text-black dark:text-gray-300 w-full p-2 border rounded"
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                    />
                                                ) : (
                                                    <p className="text-xs sm:text-sm font-medium text-black dark:text-gray-300 overflow-hidden">
                                                        {user?.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col items-start justify-center rounded-2xl bg-golden dark:bg-gray-800 bg-clip-border px-4 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                                <p className="text-xs sm:text-sm text-black dark:text-gray-300">Mobile</p>
                                                {isEditMode ? (
                                                    <input
                                                        type="text"
                                                        name="mobile"
                                                        className="text-xs sm:text-sm font-medium text-black dark:text-gray-300 w-full p-2 border rounded"
                                                        value={formik.values.mobile}
                                                        onChange={formik.handleChange}
                                                    />
                                                ) : (
                                                    <p className="text-xs sm:text-sm font-medium text-black dark:text-gray-300 overflow-hidden">
                                                        {user?.mobile}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-4 w-full">
                                            {isEditMode ? (
                                                <button
                                                    type="button"
                                                    onClick={formik.handleSubmit}
                                                    className="bg-blue-500 text-white p-2 rounded"
                                                >
                                                    Save Changes
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditMode(true)}
                                                    className="bg-green-500 text-white p-2 rounded"
                                                >
                                                    Edit Profile
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    )}

                    {/* Address Section */}
                    {currentSection === "addresses" && (
                        <Addresses />
                    )}

                    {/* Liked Section */}
                    {currentSection === "liked" && (
                        <div className="p-4 bg-light-golden rounded-lg shadow-md dark:bg-gray-900">
                            <Liked />
                        </div>
                    )}

                    {/* Orders Section */}
                    {currentSection === "allOrders" && (
                        <div className="p-4 bg-light-golden rounded-lg shadow-md dark:bg-gray-900">
                            <AllOrders />
                        </div>
                    )}
                </main>

            </div>
            <BottomNav />
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const SidebarButton = ({ section, currentSection, setCurrentSection, setIsSmallSidebarOpen }) => (
    <button
        onClick={() => {
            setCurrentSection(section);
            setIsSmallSidebarOpen(false);
        }}
        className={`flex items-center px-4 py-1 sm:px-6 sm:py-2 mt-4 text-gray-100 transition-colors duration-200 ${currentSection === section ? 'bg-gray-700' : 'bg-transparent'} sm:text-base text-sm`}
    >
        {section === 'profile' ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            </svg>
        ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        )}
        <span className="mx-2 sm:mx-3 capitalize">{section}</span>
    </button>

);



export default Profile;
