import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGetAllAddImagesQuery } from '../redux/apis/openApi';

const AddsImages = () => {
    const { data: images = [] } = useGetAllAddImagesQuery();
    const [fadeOut, setFadeOut] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (images.length > 0) {
            setCurrentImages(images.slice(0, 6));
        }
    }, [images]);

    const replaceImageOneByOne = () => {
        if (images.length === 0) return;

        setFadeOut(true);
        setTimeout(() => {
            setCurrentImages((prevImages) => {
                const newImages = [...prevImages];
                const nextImage = images[(imageIndex + prevImages.length) % images.length];
                newImages[imageIndex % prevImages.length] = nextImage;

                return newImages;
            });

            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            setFadeOut(false);
        }, 500);
    };

    useEffect(() => {
        const interval = setInterval(replaceImageOneByOne, 2000);
        return () => clearInterval(interval);
    }, [images, imageIndex]);

    const fadeStyle = {
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out'
    };

    return (
        <div className="container mx-auto sm:p-5 md:p-20">
            {/* Large screen grid */}
            <div
                className=" gap-4 hidden md:grid"
                style={{
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridTemplateRows: 'repeat(3, 200px)',
                    gridAutoFlow: 'dense'
                }}
            >
                {currentImages.map((src, index) => {
                    const isLarge = index % 3 === 0;
                    return (
                        <motion.div
                            key={index}
                            className="rounded-lg overflow-hidden"
                            style={{
                                ...fadeStyle,
                                gridColumn: isLarge ? 'span 2' : 'span 1',
                                gridRow: isLarge ? 'span 2' : 'span 1'
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                className="h-full w-full object-cover rounded-lg"
                                src={src?.image}
                                alt={`image-${index}`}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Small screen layout */}
            <div className="grid gap-4 md:hidden grid-cols-2 sm:grid-cols-2">
                {currentImages.map((src, index) => (
                    <motion.div
                        key={index}
                        className="rounded-lg overflow-hidden"
                        style={fadeStyle}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            className="h-full w-full object-cover rounded-lg"
                            src={src?.image}
                            alt={`image-${index}`}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AddsImages;
