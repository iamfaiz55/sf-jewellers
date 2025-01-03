import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as  yup from 'yup'
import { useRegisterAdminMutation } from '../redux/apis/adminAuthApi'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

const AdminRegister = () => {
    const [registerAdmin, { isSuccess }] = useRegisterAdminMutation()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            email: yup.string().email().required("Enter Email"),
            password: yup.string().required("Enter Password"),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(values);
            registerAdmin(values)
            resetForm()
        }
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            toast.success("User Register Success")
            navigate("/login")
        }
    }, [isSuccess])

    return <>

        <div class="flex flex-col h-screen bg-gray-100">
            <div class="grid place-items-center mx-2  sm:my-auto">

                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">
                    {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
                    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                        Admin Register
                    </h2>

                    <form onSubmit={formik.handleSubmit}>
                        {/* <!-- Email Input --> */}
                        <label for="name" class="block text-xs font-semibold text-gray-600 uppercase">Name</label>
                        <input {...formik.getFieldProps("name")} id="name" name="name" placeholder="Enter Your Name"
                            class="
                            rounded-md my-2
                            block w-full py-3 px-1 mt-2 
                    text-gray-200 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        />



                        <label for="name" class="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                        <input id="email" type="email" name="email" {...formik.getFieldProps("email")} placeholder="e-mail address" autocomplete="email"
                            class="rounded-md my-2 block w-full py-3 px-1 mt-2 
                    text-gray-200 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        />

                        {/* <!-- Password Input --> */}
                        <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                        <input {...formik.getFieldProps("password")} id="password" type="password" name="password" placeholder="password" autocomplete="current-password"
                            class="rounded-md my-2 block w-full py-3 px-1 mt-2 mb-4
                    text-gray-200 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required />

                        {/* <!-- Auth Buttton --> */}
                        <button type="submit"
                            class="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none">
                            Register
                        </button>

                        {/* <!-- Another Auth Routes --> */}
                        <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                            <a href="#" class="flex-2 underline">
                                Forgot password?
                            </a>

                            <p class="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                                or
                            </p>

                            <Link to="/admin/login" class="flex-2 underline">
                                Already Have Account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AdminRegister