import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogoutUserMutation } from '../redux/apis/userAuthApi';
// import { filterContext, usefilter } from '../App';
import { useSelector } from 'react-redux';
import { useGetAllCartItemsQuery } from '../redux/apis/userApi';
import { useGetAllCAtegoriesQuery, useGetAllMenuItemsQuery, useGetCompanyDetailsQuery, useGetTaxesQuery } from '../redux/apis/openApi';
import Theme from '../components/Theme';

const UserNavbar = () => {
    const { data: companyDetails } = useGetCompanyDetailsQuery();
    const { data: navmenus } = useGetAllMenuItemsQuery();
    const { data: taxes } = useGetTaxesQuery();
    // const navigate = useNavigate();
    // const { setSelectedType } = usefilter(filterContext);
    const [logoutUser] = useLogoutUserMutation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useSelector(state => state.userData);
    const { data: cartItems, error } = useGetAllCartItemsQuery(user && user._id);
    const { data: allCategories } = useGetAllCAtegoriesQuery();
    // const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (error && error.status === 401) {
            logoutUser();
        }
    }, [error, logoutUser]);

    const subtotal = cartItems?.reduce((acc, item) => {
        const productVariant = item.productId.varient.find(variant => variant._id === item.varientId);
        return productVariant ? acc + (productVariant.price * item.quantity) : acc;
    }, 0);

    const discount = taxes?.find(tax => tax.taxName === 'Discount')?.percent || 0;
    const discountAmount = (subtotal * discount) / 100;
    const totalAfterDiscount = subtotal - discountAmount;

    return <>
        <div className="bg-light-golden dark:bg-gray-800 py-2">
            <div className="m-2 md:m-5 z-20 relative">
                <div className="navbar rounded-lg bg-light-golden dark:bg-gray-800">
                    {/* Logo Section */}
                    <div className="flex-1 flex items-center space-x-4">
                        <Link to="/">
                            <img className="w-16 h-12 md:w-20 md:h-14" src={companyDetails?.logo} alt="Logo" />
                        </Link>

                        {/* Mobile Sidebar Toggle */}
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="btn btn-ghost md:hidden text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>


                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-6 z-1000 ">
                            {/* Categories Dropdown */}
                            {/* <div className="dropdown dropdown-hover z-1000">
                                <div className="btn btn-ghost dark:text-white text-gray-900">Categories</div>
                                <div className="dropdown-content p-4 bg-gray-50 dark:bg-gray-800 rounded-box shadow w-[250px]">
                                    {allCategories?.map(category => (
                                        <Link
                                            key={category._id}
                                            className="block px-4 py-3 text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                            onClick={() => setSelectedType(category.category)}
                                        >
                                            {category.category}
                                        </Link>
                                    ))}
                                </div>
                            </div> */}


                            {/* Menus Dropdown */}
                            <div className="dropdown dropdown-hover z-1000">
                                <div className="btn btn-ghost dark:text-white">Menus</div>
                                <div className="dropdown-content p-4 bg-light-golden dark:bg-gray-800 rounded-box shadow w-80">
                                    {navmenus?.map(menu => (
                                        <div key={menu._id} className="mb-4">
                                            {/* Main Menu Header */}
                                            <h3 className="text-md font-bold text-gray-900 dark:text-gray-100">{menu.header}</h3>
                                            <div className="flex flex-col gap-2 mt-2">
                                                {menu.children.map(child => (
                                                    <div key={child._id} className="relative group">
                                                        {/* Child Item */}
                                                        <Link
                                                            to={child.link}
                                                            className="text-gray-800 dark:text-gray-200 hover:text-golden dark:hover:text-golden font-semibold"
                                                        >
                                                            {child.menuitem}
                                                        </Link>
                                                        {/* Right Arrow for Dropdown Indication */}
                                                        {child.grandChildren?.length > 0 && (
                                                            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 ml-2 text-gray-600 dark:text-gray-300">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    className="h-5 w-5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M9 5l7 7-7 7"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        )}
                                                        {/* Grandchildren Dropdown */}
                                                        {child.grandChildren?.length > 0 && (
                                                            <div className="dropdown-content p-2 bg-light-golden dark:bg-gray-800 rounded-box shadow absolute left-full top-0 hidden group-hover:block z-10 w-56">
                                                                {child.grandChildren.map(grand => (
                                                                    <Link
                                                                        key={grand._id}
                                                                        to={grand.link}
                                                                        className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
                                                                    >
                                                                        {grand.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>




                            {/* About Dropdown */}
                            <div className="dropdown dropdown-hover z-1000">
                                <div className="btn btn-ghost text-gray-900 dark:text-white">About</div>
                                <div className="dropdown-content p-4 bg-gray-50 dark:bg-gray-800 rounded-box shadow w-[200px]">
                                    <Link
                                        to="/user/mission"
                                        className="block px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                    >
                                        Mission
                                    </Link>
                                    <Link
                                        to="/user/vision"
                                        className="block px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                    >
                                        Vision
                                    </Link>
                                    <Link
                                        to="/user/about"
                                        className="block px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                    >
                                        About
                                    </Link>
                                </div>
                            </div>

                            <Link to="/user/contact" className="btn btn-ghost dark:text-white">Contact</Link>
                        </div>
                    </div>

                    {/* Cart and Profile */}
                    <div className="flex-none flex items-center space-x-4">
                        {/* Cart */}
                        {/* Cart and Profile */}
                        <div className="flex-none flex items-center space-x-4">
                            {/* Cart */}
                            <div className="dropdown dropdown-end">
                                <button className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-800 dark:text-gray-200"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="badge badge-sm indicator-item bg-golden text-gray-800 dark:text-gray-200">
                                            {cartItems?.length}
                                        </span>
                                    </div>
                                </button>
                                <div className="dropdown-content card card-compact p-5 w-48 bg-light-golden dark:bg-gray-800 shadow">
                                    <span className="text-md font-bold text-gray-900 dark:text-white">
                                        {cartItems?.length} Items
                                    </span>
                                    <span className="font-bold text-gray-800 dark:text-gray-200">
                                        Total: ${totalAfterDiscount ? totalAfterDiscount?.toFixed(2) : 0}
                                    </span>
                                    <div className="card-actions">
                                        <Link
                                            to="/user/cart"
                                            className="btn btn-block bg-golden text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                                        >
                                            View Cart
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Dark/Light Theme Toggle */}
                        <Theme />

                        {/* Profile */}

                        <div className="dropdown dropdown-end hidden md:block dark:text-white">
                            <button className="btn btn-ghost btn-circle avatar">
                                {
                                    user
                                        ? <>
                                            <img
                                                className="w-8 rounded-full"
                                                src={user && user.image || 'https://via.placeholder.com/150'}
                                                alt="User Avatar"
                                            />
                                        </>
                                        : <>
                                            <button className='btn btn-circle bg-golden'>P</button>
                                        </>
                                }
                            </button>
                            <ul className="dropdown-content menu p-2 w-48 bg-light-golden dark:bg-gray-800 rounded-box shadow">
                                <li><Link to="/user/profile">Profile</Link></li>
                                <li><Link to="/admin/dashboard">Admin Page</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        {isSidebarOpen && (
            <div
                className="fixed inset-0 z-30 bg-black bg-opacity-50"
                onClick={() => setSidebarOpen(false)}
            >
                <div
                    className="absolute left-0 top-0 w-4/5 h-full bg-light-golden dark:bg-gray-800 shadow-lg overflow-y-auto"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
                >
                    {/* Close Button */}
                    <button
                        className="btn btn-ghost absolute top-4 right-4 text-gray-800 dark:text-gray-200"
                        onClick={() => setSidebarOpen(false)}
                    >
                        ✕
                    </button>

                    {/* Sidebar Content */}
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Menu
                        </h2>
                        <ul className="mt-4 space-y-4">
                            {/* Categories */}
                            <li>
                                <h3 className="font-bold text-gray-700 dark:text-gray-200">
                                    Categories
                                </h3>
                                {allCategories?.map((category) => (
                                    <Link
                                        key={category._id}
                                        className="block px-4 py-3 text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        {category.category}
                                    </Link>
                                ))}
                            </li>

                            {/* Menus */}
                            <li>
                                <h3 className="font-bold text-gray-700 dark:text-gray-200">
                                    Menus
                                </h3>
                                {navmenus?.map((menu) => (
                                    <div key={menu._id}>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                            {menu.header}
                                        </h4>
                                        <ul className="ml-4 mt-2">
                                            {menu.children.map((child) => (
                                                <li key={child._id}>
                                                    <Link
                                                        to={child.link}
                                                        className="text-gray-800 dark:text-gray-200 hover:text-golden dark:hover:text-golden font-semibold"
                                                        onClick={() => setSidebarOpen(false)}
                                                    >
                                                        {child.menuitem}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </li>

                            {/* Other Links */}
                            <li>
                                <Link
                                    to="/user/contact"
                                    className="block px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )}

    </>
};

export default UserNavbar;
