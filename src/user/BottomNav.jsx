import React from 'react';
import { Link } from 'react-router-dom';

const BottomNav = () => {
    return (
        <>
            {/* Bottom navigation for small screens */}
            <div className="btm-nav z-20 fixed bottom-0 w-full bg-light-golden dark:bg-gray-800 text-white flex justify-around py-3 sm:hidden">
                <a className="focus:outline-none text-golden dark:text-dark-golden hover:text-yellow-300 dark:hover:text-yellow-400">
                    <Link to={"/"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
                        </svg>
                    </Link>
                </a>
                <button className="focus:outline-none text-golden dark:text-dark-golden hover:text-yellow-300 dark:hover:text-yellow-400 active">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <Link to='/user/profile' className="focus:outline-none text-golden dark:text-dark-golden hover:text-yellow-300 dark:hover:text-yellow-400">
                    {/* <button > */}
                    <svg
                        className='h-8 w-8'
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <g id="_6-Profile" data-name="6-Profile">
                            <path d="M32 0a32 32 0 1 0 32 32A32 32 0 0 0 32 0zm0 62a29.88 29.88 0 0 1-20.37-8h40.74A29.88 29.88 0 0 1 32 62zm-2.18-41h4.36A3.55 3.55 0 0 0 37 22.91V24c0 2.77-1.31 6-5 6s-5-3.23-5-6v-1.09A3.55 3.55 0 0 0 29.82 21zM27 20.86v-4.39A8.31 8.31 0 0 1 32 15a8.31 8.31 0 0 1 5 1.47v4.39c-.5-.13-1-.38-1-.86a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1c0 .47-.5.72-1 .86zm7.84 11.89L32 35.59l-2.84-2.84.38-1.19a7 7 0 0 0 4.9 0zM31 37.41V41h2v-3.59l3.25-3.25 6 2.61.75 1.47V52h-3v-5h-2v5H26v-5h-2v5h-3V38.24l.73-1.46 6-2.61zM54.34 52H45V38a1 1 0 0 0-.11-.45l-1-2a1 1 0 0 0-.5-.47l-6.63-2.87-.54-1.67A8.2 8.2 0 0 0 39 24v-8a1 1 0 0 0-.29-.71A9.73 9.73 0 0 0 32 13a9.73 9.73 0 0 0-6.71 2.29A1 1 0 0 0 25 16v8a8.2 8.2 0 0 0 2.77 6.54l-.54 1.67-6.63 2.87a1 1 0 0 0-.5.47l-1 2a1 1 0 0 0-.1.45v14H9.66a30 30 0 1 1 44.67 0z" />
                            <path d="M57 31a25 25 0 0 0-50 0h2a23 23 0 0 1 46 0zM7 33h2v2H7zM55 33h2v2h-2z" />
                        </g>
                    </svg>
                    {/* </button> */}
                </Link>
            </div>
        </>
    );
};

export default BottomNav;
