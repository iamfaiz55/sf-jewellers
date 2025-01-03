import React from 'react';
import { useGetAllContactsQuery } from '../redux/apis/adminApi';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

const GetContacts = () => {
    const { data, isLoading, error } = useGetAllContactsQuery();

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen bg-light-golden py-6 sm:py-12">
            <div className="flex flex-col items-center">
                <svg
                    className="animate-spin h-10 w-10 text-amber-500 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        cx="12"
                        cy="12"
                        r="10"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    />
                </svg>
                <p className="text-lg text-amber-700">Loading Contacts...</p>
            </div>
        </div>
    );

    if (error) return <p className="text-red-500 text-center">Error fetching contacts.</p>;

    return (
        <div className="min-h-screen bg-light-golden py-6 sm:py-12 dark:bg-gray-800">
            {/* <Sidebar /> */}
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-400"
                >
                    <h2 className="text-2xl font-bold text-amber-900 p-6 border-b border-amber-300">
                        Contact List
                    </h2>
                    {/* Table for md and lg screens */}
                    <div className="hidden md:block">
                        <table className="min-w-full divide-y divide-amber-200">
                            <thead className="bg-amber-100 dark:bg-gray-600">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-500 uppercase tracking-wider">Message</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-amber-200 dark:bg-gray-300">
                                {data?.map((contact, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{contact.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{contact.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{contact.subject}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{contact.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card layout for sm screens */}
                    <div className="block md:hidden">
                        {data?.map((contact, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-6">
                                <h3 className="text-lg font-bold text-amber-900 mb-2">{contact.name}</h3>
                                <p className="text-sm text-amber-800"><strong>Email:</strong> {contact.email}</p>
                                <p className="text-sm text-amber-800"><strong>Subject:</strong> {contact.subject}</p>
                                <p className="text-sm text-amber-800"><strong>Message:</strong> {contact.message}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GetContacts;
