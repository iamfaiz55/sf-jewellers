import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutAdminMutation } from '../redux/apis/adminAuthApi';
import { toast } from 'sonner';
// import { useSelector } from 'react-redux';
import { useGetCompanyDetailsQuery } from '../redux/apis/openApi';
import ThemeToggle from '../components/Theme';

const AdminNavbar = () => {
    const { data } = useGetCompanyDetailsQuery();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const [logoutAdmin, { isSuccess }] = useLogoutAdminMutation();
    // const { admin } = useSelector(state => state.adminData);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin Logout Success");
            navigate("/admin/login");
        }
    }, [isSuccess, navigate]);

    // Handle light/dark mode toggling
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md py-1">
            <div className="container mx-auto px-5 relative z-20">
                <div className="navbar flex justify-between items-center rounded-lg bg-amber-400 dark:bg-gray-800 p-3">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            className="w-12 h-12"
                            src={data?.logo || "https://static.vecteezy.com/system/resources/previews/027/990/875/non_2x/royal-frame-logo-generative-ai-free-png.png"}
                            alt="Company Logo"
                        />
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {data?.name || "Admin Panel"}
                        </span>
                    </Link>

                    {/* Navbar Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Toggle Light/Dark Mode */}
                        {/* Dark/Light Theme Toggle */}
                        <ThemeToggle />


                        {/* Hamburger Menu for Mobile */}
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="btn btn-ghost md:hidden hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-900 dark:text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-0 z-30 transform transition-transform bg-black bg-opacity-50 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={() => setSidebarOpen(false)}
            >
                <div
                    className="w-64 bg-white dark:bg-gray-800 h-full p-5 relative overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="absolute top-4 right-4 text-gray-800 dark:text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Sidebar Links */}
                    <ul className="space-y-4 mt-10 text-gray-800 dark:text-gray-200">
                        <li>
                            <Link to="/admin/dashboard" className="block p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-700">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/allOrders" className="block p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-700">
                                All Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/allUsers" className="block p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-700">
                                All Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/addCarousel" className="block p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-700">
                                Carousel
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/categories" className="block p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-700">
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/get-contacts" className="block p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-700">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/paymentMethod" className="block p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-700">
                                Payment Method
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/addresses" className="block p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-700">
                                Address & Taxes
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => logoutAdmin()}
                                type="button"
                                className="btn w-full bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 text-white"
                            >
                                Logout Admin
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
