/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { filterContext, usefilter } from '../App';
import { toast } from 'sonner';
import { useGetCArouselQuery, useGetTaxesQuery, useLazyGetFilteredDataQuery, useLazyGetAllProductsQuery, useGetPublicProductMaterialQuery } from '../redux/apis/openApi';
import ScrollCard from './ScrollCard';
import AddsImages from './AddsImages';
import Footer from './Footer';
import BottomNav from '../user/BottomNav';
import useScrollRestoration from '../hooks/useScrollRestoration';
import { debounce } from 'lodash';

const Home = () => {
    const { selectedType } = usefilter(filterContext);
    useScrollRestoration();

    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 8;
    const { data: materials } = useGetPublicProductMaterialQuery();
    const [selectedMaterial, setSelectedMaterial] = useState(null); // Selected material

    const { data: taxes } = useGetTaxesQuery();
    const [filter, { data: filteredData, isSuccess: isFilterSuccess, isError: isFilterError, error: filterError }] = useLazyGetFilteredDataQuery();
    const [fetchProducts, { data: productsData, isSuccess: isProductsSuccess, isError: isProductsError, error: productsError }] = useLazyGetAllProductsQuery();

    const { data: carousel = [] } = useGetCArouselQuery();
    const [currentSlide, setCurrentSlide] = useState(0);

    const discountTax = useMemo(() => {
        return taxes?.find(tax => tax.taxName === "Discount");
    }, [taxes]);

    const applyDiscount = useCallback((price) => {
        if (discountTax) {
            const discountAmount = (price * discountTax.percent) / 100;
            return price - discountAmount;
        }
        return price;
    }, [discountTax]);

    useEffect(() => {
        // Fetch all products if no material is selected (i.e., selectedMaterial is null)
        if (!selectedMaterial) {
            fetchProducts({ page: currentPage, limit: productsPerPage });
        }
    }, [fetchProducts, currentPage, selectedMaterial, productsPerPage]);


    const debouncedFilter = useCallback(
        debounce((filterParams) => {
            filter(filterParams);
        }, 500), // Delay of 500ms
        []
    );

    useEffect(() => {
        // Fetch all products if no material is selected (i.e., selectedMaterial is null)
        if (!selectedMaterial) {
            fetchProducts({ page: currentPage, limit: productsPerPage });
        }
    }, [fetchProducts, currentPage, selectedMaterial, productsPerPage]);

    useEffect(() => {
        // If a material is selected, filter the products by material
        if (selectedMaterial) {
            debouncedFilter({ material: selectedMaterial, page: currentPage, limit: productsPerPage });
        }
    }, [selectedMaterial, currentPage, debouncedFilter]);

    useEffect(() => {
        if (carousel.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % carousel.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [carousel]);

    useEffect(() => {
        if (selectedType) {
            debouncedFilter({ productType: selectedType });
        }
    }, [selectedType, debouncedFilter]);

    useEffect(() => {
        if (isFilterError) {
            toast.error(filterError?.message || 'An error occurred while filtering.');
        }
    }, [isFilterError, filterError]);

    useEffect(() => {
        if (!selectedType) {
            fetchProducts({ page: currentPage, limit: productsPerPage, material: null });
        }
    }, [fetchProducts, currentPage, selectedType]);
    useEffect(() => {
        if (selectedType) {
            fetchProducts({ page: currentPage, limit: productsPerPage, material: selectedMaterial });
        }
    }, [fetchProducts, currentPage, selectedType]);
    // useEffect(() => {
    //     if (selectedMaterial) {
    //         filter({ material: selectedMaterial, page: filterPage, limit: productsPerPage });
    //     }
    // }, [selectedMaterial, currentPage, filter, filterPage]);

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

    const handleMaterialSelection = (material) => {
        setSelectedMaterial(material); // If material is null, it will show all products
    };
    // console.log("allProducts", allProducts);

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
                            </motion.div>
                        ))}
                    </div>
                </div>
                <ScrollCard />
                <AddsImages />

                <section>
                    <div className="container mx-auto flex flex-col items-center px-6 py-4">
                        {/* Category Section */}
                        <div className="container mx-auto flex flex-col items-center px-6 py-4">
                            {/* Category Section */}
                            <div className="w-full flex justify-center gap-2 sm:gap-4 py-4 flex-wrap">
                                {/* Add 'All' button */}
                                <button
                                    onClick={() => handleMaterialSelection(null)} // Set material to null to fetch all products
                                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${selectedMaterial === null
                                            ? 'bg-golden text-white'
                                            : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        } hover:bg-golden hover:text-white focus:outline-none`}
                                >
                                    All
                                </button>

                                {/* Iterate through materials */}
                                {materials && materials.map((tab, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleMaterialSelection(tab.name)}
                                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${selectedMaterial === tab.name
                                                ? 'bg-golden text-white'
                                                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            } hover:bg-golden hover:text-white focus:outline-none`}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                        </div>



                        {/* Animated Heading */}
                        <motion.h2
                            className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            Recommended for You
                        </motion.h2>

                        {/* Desktop Grid */}
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
                                            <p className="mr-2 font-semibold">${applyDiscount(item.varient[0]?.price)}</p>
                                            <p className="text-xs line-through">${item.varient[0]?.mrp}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default Home;
