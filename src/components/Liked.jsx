/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useDeleteLikeMutation, useGetLikedQuery } from '../redux/apis/userApi';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../user/BottomNav';
import useScrollRestoration from '../hooks/useScrollRestoration';
import { usePostHistoryMutation } from '../redux/apis/openApi';

const Liked = () => {
    useScrollRestoration()
    const { user } = useSelector((state) => state.userData);
    const { data } = useGetLikedQuery(user._id);
    // console.log(data);
    const [postHistory] = usePostHistoryMutation()

    const [deleteLiked, { isSuccess }] = useDeleteLikeMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success('Liked Item Deleted Successfully');
        }
    }, [isSuccess]);


    useEffect(() => {
        if (user) {
            postHistory({ userId: user._id, type: "liked" })
        }
    }, [])


    return (
        <div className=" bg-light-golden dark:bg-gray-900">
            {data && data.length < 1 && (
                <div className="flex flex-col items-center justify-center h-full p-6 bg-light-golden rounded-lg shadow-md dark:bg-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-dark-golden dark:text-light-golden mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3v2m0 0a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1zM6 3h3M6 9h1m-1 0h1m5-6v2m0 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1zM11 3h3M11 9h1m-1 0h1m5-6v2m0 0a1 1 0 0 1-1 1v8a1 1 0 0 1 1 1h1a1 1 0 0 1 1-1V6a1 1 0 0 1-1-1h-1zM16 3h3M16 9h1m-1 0h1" />
                    </svg>

                    <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
                        You haven't liked any products yet. <br />
                        Browse our collection to find something you love!
                    </p>

                </div>
            )}
            {user.isBlock ? (
                <div className="text-center py-10">
                    <h1 className="sm:text-sm md:text-3xl  font-bold text-dark-golden dark:text-light-golden">
                        You Are Blocked By Admin
                    </h1>
                </div>
            ) : (
                <>
                    {
                        data && data.length > 0 && <h1 className="mb-5 text-center text-xl  md:text-3xl font-extrabold text-dark-golden dark:text-light-golden">
                            Your Liked Products
                        </h1>

                    }
                    {data && data.length > 0 ? (
                        <div className="mx-auto max-w-6xl px-6 sm:px-4 md:flex md:flex-wrap md:space-x-6 xl:px-0">
                            <div className="w-full space-y-6 sm:space-y-4">
                                {data.map((likedItem) => {
                                    // Find the matched variant based on variantId
                                    const matchedVariant = likedItem.productId.varient.find(
                                        (variant) => variant._id === likedItem.varientId
                                    );

                                    return (
                                        <div
                                            key={likedItem.productId._id}
                                            onClick={() => navigate(`/details/${likedItem.productId._id}`)}
                                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                                        >
                                            {/* Image Section */}
                                            <div className="flex justify-center w-full">
                                                <img
                                                    src={likedItem.productId.images[0]}
                                                    alt="product-image"
                                                    className="w-28  rounded-lg"
                                                />
                                            </div>

                                            {/* Content Section */}
                                            <div className="flex flex-col sm:flex-row sm:justify-between w-full sm:ml-4">
                                                <div className="sm:mt-0 space-y-2 sm:space-y-1">
                                                    <h2 className="text-sm sm:text-2xl font-semibold text-dark-golden dark:text-light-golden">
                                                        {likedItem.productId.name}
                                                    </h2>
                                                    {matchedVariant && (
                                                        <>
                                                            <p className="text-dark-golden dark:text-light-golden  text-sm sm:text-lg">
                                                                Price: ₹{matchedVariant.price}
                                                            </p>
                                                            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                                                                {matchedVariant.desc}
                                                            </p>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Price and Delete Button */}
                                                <div className="flex  justify-end sm:space-x-6 mt-4 sm:mt-0">
                                                    {/* {matchedVariant && (
                                                        <p className="text-lg sm:text-xl font-semibold text-dark-golden dark:text-light-golden">
                                                            ₹{matchedVariant.price}
                                                        </p>
                                                    )} */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteLiked(likedItem._id);
                                                        }}
                                                        className="ml-4 sm:h-8  transition-colors duration-200 rounded-lg bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none "
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-6 w-6 text-white hover:text-gray-200"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="text-3xl font-extrabold text-center text-dark-golden dark:text-light-golden">
                            No liked items found.
                        </div>
                    )}

                </>
            )}
            <BottomNav />
        </div>
    );
};

export default Liked;
