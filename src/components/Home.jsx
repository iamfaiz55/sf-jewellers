import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usefilter } from '../App';
import { toast } from 'sonner';
import { useGetCArouselQuery, useGetTaxesQuery, useLazyGetFilteredDataQuery, useLazyGetAllProductsQuery, useGetAllMenuItemsQuery } from '../redux/apis/openApi';
import ScrollCard from './ScrollCard';
import AddsImages from './AddsImages';
import Footer from './Footer';
import BottomNav from '../user/BottomNav';
import useScrollRestoration from '../hooks/useScrollRestoration';

const Home = () => {
    const { selectedType } = usefilter();
    const { data: navmenus } = useGetAllMenuItemsQuery();
    useScrollRestoration()
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 8;

    const { data: taxes } = useGetTaxesQuery();
    const [filter, { data: filteredData, isSuccess: isFilterSuccess, isError: isFilterError, error: filterError }] = useLazyGetFilteredDataQuery();
    const [fetchProducts, { data: productsData, isSuccess: isProductsSuccess, isError: isProductsError, error: productsError }] = useLazyGetAllProductsQuery();

    const { data: carousel = [] } = useGetCArouselQuery();
    const [currentSlide, setCurrentSlide] = useState(0);

    const discountTax = taxes?.find(tax => tax.taxName === "Discount");

    const applyDiscount = (price) => {
        if (discountTax) {
            const discountAmount = (price * discountTax.percent) / 100;
            return price - discountAmount;
        }
        return price;
    };

    useEffect(() => {
        if (carousel.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % carousel.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [carousel]);

    useEffect(() => {
        if (selectedType) {
            filter({ productType: selectedType });
        }
    }, [selectedType, filter]);

    useEffect(() => {
        if (isFilterError) {
            toast.error(filterError?.message || 'An error occurred while filtering.');
        }
    }, [isFilterError, filterError]);

    useEffect(() => {
        if (!selectedType) {
            fetchProducts({ page: currentPage, limit: productsPerPage });
        }
    }, [fetchProducts, currentPage, selectedType]);

    useEffect(() => {
        if (isFilterSuccess && filteredData) {
            setAllProducts(filteredData || []);
            setTotalPages(1); // Assume single page for filtered data
        }
    }, [isFilterSuccess, filteredData]);

    useEffect(() => {
        if (isProductsSuccess && productsData) {
            setAllProducts(productsData.result);
            setTotalPages(productsData.pagination?.totalPages || 1);
        }
    }, [isProductsSuccess, productsData]);

    useEffect(() => {
        if (isProductsError) {
            toast.error(productsError?.message || 'An error occurred while fetching products.');
        }
    }, [isProductsError, productsError]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    console.log("navmenus", navmenus);

    return (
        <div className='bg-light-golden dark:bg-gray-900'>

            <div className='mx-3'>
                <div className="relative w-full h-32 md:h-96 t-6 overflow-hidden rounded-md">
                    <div className="relative w-full h-full">
                        {carousel.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`absolute w-full h-full ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                            >
                                <img
                                    src={item.image}
                                    className="w-full h-28 md:h-full object-cover"
                                    alt={`Slide ${index + 1}`}
                                />
                                {/* <div className="absolute inset-0 flex items-center justify-start p-6 bg-gradient-to-r from-black via-transparent to-black opacity-50 ">
                                    <motion.div
                                        className="text-white bg-black bg-opacity-60 p-4 rounded-lg"
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -100, opacity: 0 }}
                                        transition={{ duration: 1, ease: 'easeInOut' }}
                                    >
                                        <h2 className="text-4xl font-bold mb-4">{item.mainHeading}</h2>
                                        <p className="text-lg">{item.paragraph}</p>
                                    </motion.div>
                                </div> */}
                            </motion.div>
                        ))}
                    </div>
                </div>
                <ScrollCard />
                <AddsImages />

                <section>
                    <div className="container mx-auto flex flex-col items-center px-6 py-4">
                        {/* Animated Heading */}
                        <motion.h2
                            className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            Recommended for You
                        </motion.h2>

                        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
                            {allProducts.map(item => (
                                <Link
                                    key={item._id}
                                    to={`/details/${item._id}`}
                                    className="transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    <img className="h-48 w-full object-cover object-center duration-300 hover:scale-110" src={item.images[0]} alt="Product Image" />
                                    <div className="p-4">
                                        <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-200">{item.name}</h2>
                                        <p className="mb-2 text-base text-gray-700 dark:text-gray-400">{item.desc}</p>
                                        <div className="flex items-center">
                                            <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-gray-200">${applyDiscount(item.varient[0]?.price)}</p>
                                            <p className="text-base font-medium text-gray-500 line-through dark:text-gray-600">${item.varient[0]?.mrp}</p>
                                            <p className="ml-auto text-base font-medium text-green-500">{item.varient[0]?.discount} off</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Small screen */}
                        <div className="grid grid-cols-2 gap-8 mt-8 sm:hidden">
                            {allProducts.map(item => (
                                <Link
                                    key={item._id}
                                    to={`/details/${item._id}`}
                                    className="transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    <img className="h-24 w-full object-cover object-center duration-300 hover:scale-110" src={item.images[0]} alt={item.name} />
                                    <div className="p-2">
                                        <p className="font-bold text-gray-900 dark:text-gray-200" style={{ fontSize: 14 }}>{item.name}</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-400">{item.desc}</p>
                                        <div className="flex items-center text-sm">
                                            <p className="mr-1 font-semibold text-gray-900 dark:text-gray-200" style={{ fontSize: 12 }}>${applyDiscount(item.varient[0]?.price)}</p>
                                            <p style={{ fontSize: 12 }} className="text-gray-500 line-through text-sm dark:text-gray-600">${item.varient[0]?.mrp}</p>
                                        </div>
                                        <p className="ml-auto text-green-500 text-sm" style={{ fontSize: 12 }}>{item.varient[0]?.discount} off</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {!selectedType && (
                            <div className="flex justify-center mt-8">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`mx-1 px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-golden text-white' : 'bg-white text-black border dark:bg-gray-700 dark:text-white'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
            <BottomNav />
        </div>
    );
}

export default Home;