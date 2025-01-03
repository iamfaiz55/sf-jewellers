import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check for saved theme on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Update theme in localStorage and apply theme class
    useEffect(() => {
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main content with dark mode support */}
            <div className="flex-1 overflow-auto bg-light-golden dark:bg-gray-800 transition-all duration-300 ease-in-out">
                {/* Admin Navbar */}
                <AdminNavbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

                {/* Outlet for rendering routes */}
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
