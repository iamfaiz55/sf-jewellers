import React, { useEffect, useState } from 'react';
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from '../redux/apis/adminApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io(import.meta.env.VITE_BACKEND_URL);

const AllUsers = () => {
    const navigate = useNavigate();
    const { data: allUsers, refetch } = useGetAllUsersQuery();
    const [blockUser, { isSuccess: blockSuccess }] = useBlockUserMutation();
    const [unblockUser, { isSuccess: unblockSuccess }] = useUnblockUserMutation();
    const [onlineUsers, setOnlineUsers] = useState();
    const { user } = useSelector(state => state.userData)
    console.log(onlineUsers);
    // console.log(user);

    useEffect(() => {
        const userId = user && user._id;
        socket.emit("login", userId);

        socket.on("onlineUsers", (users) => {
            // console.log('online users', users);
            setOnlineUsers(users);
        });


    }, []);

    useEffect(() => {
        if (blockSuccess) {
            toast.success('User Blocked Successfully');
            refetch();
        }
        if (unblockSuccess) {
            toast.success('User Unblocked Successfully');
            refetch();
        }
    }, [blockSuccess, unblockSuccess, refetch]);

    // const onlineUserData = allUsers?.filter(user => onlineUsers.includes(user._id));

    return (
        <div className='bg-light-golden p-5 dark:bg-gray-900'>
            {/* Online Users Table */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg mb-10">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-200">Online Users</h2>
                <div className='m-5'>
                    {onlineUsers?.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300 border-spacing-2">
                            <thead className="text-xs text-gray-700 uppercase bg-light-golden dark:bg-gray-800">
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-light-golden dark:text-gray-200 dark:bg-gray-800 border-b border-gray-600">
                                    <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">#</th>
                                    <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Mobile</th>
                                    <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {onlineUsers.map((user, i) => (
                                    <tr key={user && user.email} className="hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                                        <td className="p-3 text-gray-800 dark:text-gray-300 border-b">{i + 1}</td>
                                        <td className="p-3 text-gray-800 dark:text-gray-300 border-b">{user && user.mobile}</td>
                                        <td className="p-3 text-gray-800 dark:text-gray-300 border-b">
                                            {user && user.isBlock
                                                ? <button
                                                    type="button"
                                                    onClick={() => unblockUser(user._id)}
                                                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition mr-2"
                                                >
                                                    Unblock
                                                </button>
                                                : <button
                                                    type="button"
                                                    onClick={() => blockUser(user._id)}
                                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition mr-2"
                                                >
                                                    Block
                                                </button>
                                            }
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/admin/get-history/${user._id}`)}
                                                className="btn bg-green-400 text-black"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-800 dark:text-gray-300">No users are online at the moment.</p>
                    )}
                </div>
            </div>

            {/* All Users Table */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-200">All Users</h2>
                <div className='m-5'>
                    {allUsers ? (
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300 border-spacing-2">
                            <thead className="text-xs text-gray-700 uppercase bg-light-golden dark:bg-gray-800">
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-light-golden dark:text-gray-200 dark:bg-gray-800 border-b border-gray-600">
                                    <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">#</th>
                                    <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Mobile</th>
                                    <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((user, i) => (
                                    <tr key={user.email} className="hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                                        <td className="p-3 text-gray-800 dark:text-gray-300 border-b">{i + 1}</td>
                                        <td className="p-3 text-gray-800 dark:text-gray-300 border-b">{user.mobile}</td>
                                        <td className="p-3 text-gray-800 dark:text-gray-300 border-b">
                                            {user.isBlock
                                                ? <button
                                                    type="button"
                                                    onClick={() => unblockUser(user._id)}
                                                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition mr-2"
                                                >
                                                    Unblock
                                                </button>
                                                : <button
                                                    type="button"
                                                    onClick={() => blockUser(user._id)}
                                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition mr-2"
                                                >
                                                    Block
                                                </button>
                                            }
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/admin/get-history/${user._id}`)}
                                                className="btn bg-green-400 text-black"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-800 dark:text-gray-300">Loading users...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
