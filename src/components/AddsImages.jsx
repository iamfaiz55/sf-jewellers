import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGetAllAddImagesQuery } from '../redux/apis/openApi';

const AddsImages = () => {
    const { data: images = [] } = useGetAllAddImagesQuery();
    const [fadeOut, setFadeOut] = useState(false);
    const [currentImages, setCurrentImages] = useState(images.slice(0, 6));
    const [imageIndex, setImageIndex] = useState(0);

    const replaceImageOneByOne = () => {
        setFadeOut(true);
        setTimeout(() => {
            setCurrentImages((prevImages) => {
                const newImages = [...prevImages];
                if (images.length > 0) {
                    const nextImage = images[(imageIndex + prevImages.length) % images.length].image;
                    newImages[imageIndex % prevImages.length] = { image: nextImage };
                }
                setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through the image array
                return newImages;
            });
            setFadeOut(false);
        }, 500);
    };

    useEffect(() => {
        if (images && images.length > 0) {
            setCurrentImages(images.slice(0, 6));
        }
        const interval = setInterval(replaceImageOneByOne, 2000);
        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="container mx-auto sm:p-5 md:p-20">
            {/* Large screen grid */}
            <div
                className="grid gap-4 hidden md:grid"
                style={{
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridTemplateRows: 'repeat(3, 200px)',
                    gridAutoFlow: 'dense'
                }}
            >
                {currentImages && currentImages.map((src, index) => {
                    const isLarge = index % 3 === 0;
                    return (
                        <motion.div
                            key={index}
                            className={`rounded-lg overflow-hidden ${fadeOut ? 'fade-out' : 'fade-in'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                gridColumn: isLarge ? 'span 2' : 'span 1',
                                gridRow: isLarge ? 'span 2' : 'span 1'
                            }}
                        >
                            <img
                                className="h-full w-full object-cover rounded-lg"
                                src={src.image}
                                alt={`image-${index}`}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Small screen layout */}
            <div className="grid gap-4 md:hidden grid-cols-2 sm:grid-cols-2">
                {currentImages && currentImages.map((src, index) => {
                    return (
                        <motion.div
                            key={index}
                            className={`rounded-lg overflow-hidden ${fadeOut ? 'fade-out' : 'fade-in'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                className="h-full w-full object-cover rounded-lg"
                                src={src.image}
                                alt={`image-${index}`}
                            />
                        </motion.div>
                    );
                })}
            </div>

            <style jsx>{`
                .fade-out {
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }
                .fade-in {
                    opacity: 1;
                    transition: opacity 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default AddsImages;
