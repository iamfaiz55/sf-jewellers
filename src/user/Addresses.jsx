/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useAddAddressMutation, useDeleteAddressMutation, useGetAddressesQuery } from '../redux/apis/userApi';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import useScrollRestoration from '../hooks/useScrollRestoration';

const Addresses = () => {
    useScrollRestoration()
    const { user } = useSelector((state) => state.userData);

    const { data, error, isError } = useGetAddressesQuery(user && user._id);
    const [deleteAdress, { isSuccess: addressDeleteSuccess }] = useDeleteAddressMutation();
    console.log(data);

    useEffect(() => {
        if (addressDeleteSuccess) {
            toast.success('Your Address Was Deleted Successfully');
        }
    }, [addressDeleteSuccess]);

    return <>
        <div className="p-4 bg-light-golden rounded-lg shadow-md dark:bg-gray-900  ">
            <div className="mb-5">
                <button className="btn bg-golden dark:bg-gray-700" onClick={() => document.getElementById('add').showModal()}>
                    Add Address
                </button>
                <dialog id="add" className="modal">
                    <div className="modal-box max-w-sm sm:max-w-md bg-light-golden dark:bg-gray-500 p-6 rounded-lg mx-4 sm:mx-auto">
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white text-center mb-4">Add New Address</h3>
                        <Form />
                    </div>
                </dialog>

            </div>

            {isError ? (
                <div className="text-center text-red-500 dark:text-red-400">{error.data.message}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-light-golden dark:bg-gray-800">
                    {data && data.map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative p-3 sm:p-4 bg-light-golden dark:bg-gray-800 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        >
                            <button
                                onClick={() => deleteAdress(item._id)}
                                className="absolute top-2 right-2 p-2 bg-red-200 dark:bg-red-300 rounded-full transition-colors duration-300 hover:bg-red-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 30 30">
                                    <path d="M14.984 2.486a1 1 0 0 0-.984 1.014V4H8.5A1 1 0 0 0 7.486 5H6a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2h-1.487A1 1 0 0 0 21.5 4h-5.5v-.514a1 1 0 0 0-1.016-1.014zM6 9h1.793L9.777 24.234C9.911 25.241 10.763 26 11.777 26h8.445c1.014 0 1.867-.759 1.988-1.766L22.207 9H6z" />
                                </svg>
                            </button>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{item.addressType.charAt(0).toUpperCase() + item.addressType.slice(1)}</h3>
                            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300"><span className="font-medium">House No:</span> {item.houseNo}</p>
                            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300"><span className="font-medium">Country:</span> {item.country}</p>
                            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300"><span className="font-medium">State:</span> {item.state}</p>
                            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300"><span className="font-medium">City:</span> {item.city}</p>
                            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300"><span className="font-medium">Pincode:</span> {item.pincode}</p>
                            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300"><span className="font-medium">Mobile:</span> {item.mobile}</p>
                        </motion.div>
                    ))}
                </div>

            )}
        </div>

    </>
}


const countriesData = {
    India: {
        states: {
            "Andhra Pradesh": [
                "Amaravati", "Guntur", "Tirupati", "Vijayawada", "Visakhapatnam"
            ],
            "Arunachal Pradesh": [
                "Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro"
            ],
            "Assam": [
                "Dispur", "Dibrugarh", "Guwahati", "Jorhat", "Silchar"
            ],
            "Bihar": [
                "Bhagalpur", "Darbhanga", "Gaya", "Muzaffarpur", "Patna"
            ],
            "Chhattisgarh": [
                "Bilaspur", "Durg", "Jagdalpur", "Korba", "Raipur"
            ],
            "Goa": [
                "Margao", "Panaji", "Ponda", "Mapusa", "Vasco da Gama"
            ],
            "Gujarat": [
                "Ahmedabad", "Bhavnagar", "Rajkot", "Surat", "Vadodara"
            ],
            "Haryana": [
                "Chandigarh", "Faridabad", "Gurugram", "Hisar", "Rohtak"
            ],
            "Himachal Pradesh": [
                "Dharamshala", "Kullu", "Manali", "Shimla", "Solan"
            ],
            "Jharkhand": [
                "Bokaro", "Dhanbad", "Giridih", "Jamshedpur", "Ranchi"
            ],
            "Karnataka": [
                "Bangalore", "Belgaum", "Hubli", "Mangalore", "Mysore"
            ],
            "Kerala": [
                "Kochi", "Kollam", "Kottayam", "Kozhikode", "Thiruvananthapuram"
            ],
            "Madhya Pradesh": [
                "Bhopal", "Gwalior", "Indore", "Jabalpur", "Ujjain"
            ],
            "Maharashtra": [
                "Aurangabad", "Mumbai", "Nagpur", "Nashik", "Pune", "Thane"
            ],
            "Manipur": [
                "Bishnupur", "Churachandpur", "Imphal", "Senapati", "Thoubal"
            ],
            "Meghalaya": [
                "Baghmara", "Jowai", "Nongpoh", "Shillong", "Tura"
            ],
            "Mizoram": [
                "Aizawl", "Champhai", "Kolasib", "Lunglei", "Serchhip"
            ],
            "Nagaland": [
                "Dimapur", "Kohima", "Mon", "Mokokchung", "Wokha"
            ],
            "Odisha": [
                "Bhubaneswar", "Berhampur", "Cuttack", "Rourkela", "Sambalpur"
            ],
            "Punjab": [
                "Amritsar", "Chandigarh", "Jalandhar", "Ludhiana", "Patiala"
            ],
            "Rajasthan": [
                "Ajmer", "Bikaner", "Jaipur", "Jodhpur", "Udaipur"
            ],
            "Sikkim": [
                "Gangtok", "Gyalshing", "Namchi", "Pakyong", "Mangan"
            ],
            "Tamil Nadu": [
                "Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"
            ],
            "Telangana": [
                "Hyderabad", "Karimnagar", "Khammam", "Nizamabad", "Warangal"
            ],
            "Tripura": [
                "Agartala", "Dharmanagar", "Kailashahar", "Sabroom", "Udaipur"
            ],
            "Uttar Pradesh": [
                "Agra", "Kanpur", "Lucknow", "Meerut", "Varanasi"
            ],
            "Uttarakhand": [
                "Dehradun", "Haridwar", "Nainital", "Rishikesh", "Roorkee"
            ],
            "West Bengal": [
                "Asansol", "Durgapur", "Howrah", "Kolkata", "Siliguri"
            ]
        }
    }
};



const Form = ({ edit }) => {
    const { user } = useSelector((state) => state.userData);
    const [addAddress, { isSuccess, isLoading }] = useAddAddressMutation();

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);

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
        },
        validationSchema: yup.object({
            pincode: yup.string().required("Enter pincode"),
            houseNo: yup.string().required("Enter houseNo"),
            city: yup.string().required("Enter city"),
            state: yup.string().required("Enter state"),
            country: yup.string().required("Select a country"),
            addressType: yup.string().required("Select address type"),
            mobile: yup.string().required("Enter mobile number"),
            email: yup.string(),
        }),
        onSubmit: (values, { resetForm }) => {
            if (!user.email) {
                const x = localStorage.getItem("user");
                const y = JSON.parse(x);
                const z = { ...y, email: values.email };
                localStorage.setItem("user", JSON.stringify(z));
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

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        setSelectedState("");
        setCities([]);
        formik.setFieldValue("country", country);
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setCities(countriesData[selectedCountry].states[state]);
        formik.setFieldValue("state", state);
    };

    const handleCityChange = (e) => {
        formik.setFieldValue("city", e.target.value);
    };

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
                    <div className="flex items-center space-x-2 animate-pulse">
                        <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full animate-bounce"></div>
                        <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full animate-bounce delay-200"></div>
                        <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full animate-bounce delay-400"></div>
                    </div>
                    <div className="ml-4 text-yellow-600 font-semibold text-lg">Loading...</div>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit} className="p-4 sm:p-6 bg-light-golden dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
                    <input
                        {...formik.getFieldProps("houseNo")}
                        type="text"
                        placeholder="House No."
                        className="input w-full my-2 bg-light-golden-200 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white text-sm sm:text-base py-2 border border-light-golden-300"
                    />

                    <select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="select select-bordered w-full my-2 bg-light-golden-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm sm:text-base py-2 border border-light-golden-300"
                    >
                        <option value="" disabled>Select Country</option>
                        {Object.keys(countriesData).map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>

                    <select
                        value={selectedState}
                        onChange={handleStateChange}
                        disabled={!selectedCountry}
                        className="select select-bordered w-full my-2 bg-light-golden-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm sm:text-base py-2 border border-light-golden-300"
                    >
                        <option value="" disabled>Select State</option>
                        {selectedCountry && Object.keys(countriesData[selectedCountry].states).map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>

                    <select
                        {...formik.getFieldProps("city")}
                        onChange={handleCityChange}
                        disabled={!selectedState}
                        className={`select select-bordered w-full my-2 bg-light-golden-200 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white text-sm sm:text-base py-2 border border-light-golden-300' : ''}`}
                    >
                        <option value="" disabled>Select City</option>
                        {selectedState && cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>

                    <input
                        {...formik.getFieldProps("pincode")}
                        type="number"
                        placeholder="Pincode"
                        className="input w-full my-2 bg-light-golden-200 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white text-sm sm:text-base py-2 border border-light-golden-300"
                    />

                    <input
                        {...formik.getFieldProps("mobile")}
                        type="number"
                        placeholder="Mobile"
                        className="input w-full my-2 bg-light-golden-200 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white text-sm sm:text-base py-2 border border-light-golden-300"
                    />

                    <input
                        disabled={user && user.email}
                        {...formik.getFieldProps("email")}
                        type="email"
                        placeholder="Enter your email"
                        className="input w-full my-2 bg-light-golden-200 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white text-sm sm:text-base py-2 border border-light-golden-300"
                    />

                    <select
                        {...formik.getFieldProps("addressType")}
                        className="select select-bordered w-full my-2 bg-light-golden-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm sm:text-base py-2 border border-light-golden-300"
                    >
                        <option value="" disabled>Select Address Type</option>
                        <option value="home">Home</option>
                        <option value="office">Office</option>
                    </select>

                    <div className="modal-action flex">
                        <button type="submit" className="btn sm:w-auto bg-light-golden text-black dark:bg-gray-600 dark:text-white text-sm sm:text-base py-2 border border-light-golden-300">
                            {edit ? "Update" : "Add"} Address
                        </button>
                        <button
                            type="button"
                            onClick={() => document.getElementById(edit ? "update" : "add").close()}
                            className="btn sm:w-auto bg-light-golden-200 dark:bg-gray-600 text-black dark:text-white text-sm sm:text-base py-2 border border-light-golden-300"
                        >
                            Close
                        </button>
                    </div>
                </form>



            )}
        </>
    );
};



export default Addresses