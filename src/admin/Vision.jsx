import React from 'react';

const Vision = () => {
    return (
        <div className="w-full h-screen bg-light-golden">
            <div className="flex flex-col lg:grid lg:gap-4 2xl:gap-6 lg:grid-cols-4 lg:grid-rows-2 ml-2 pt-4 px-6">
                {/* Vision Statement */}
                <div className="bg-yellow-600 lg:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-4 lg:mb-0 p-4">
                    <h1 className="text-white text-base 2xl:text-xl pl-2 2xl:pl-4">
                        Our Vision
                    </h1>
                    <p className="text-yellow-100 text-base 2xl:text-lg font-medium pt-2">
                        Our vision is to be at the forefront of innovation and technology, driving meaningful change and delivering impactful solutions that enhance the lives of people worldwide.
                    </p>
                </div>

                {/* Goals */}
                <div className="bg-yellow-700 lg:row-span-1 lg:col-span-1 rounded-lg shadow-xl mb-4 lg:mb-0 p-4">
                    <h1 className="text-yellow-100 text-base 2xl:text-xl pl-2">
                        Our Goals
                    </h1>
                    <p className="text-yellow-100 text-base 2xl:text-lg font-medium pt-2">
                        We aim to foster creativity, encourage collaboration, and drive technological advancements that contribute to a better future for all.
                    </p>
                </div>

                {/* Aspirations */}
                <div className="bg-yellow-800 lg:row-span-1 lg:col-span-1 rounded-lg shadow-xl mb-4 lg:mb-0 p-4">
                    <h1 className="text-yellow-100 text-base 2xl:text-xl pl-2">
                        Our Aspirations
                    </h1>
                    <ul className="text-yellow-100 text-base 2xl:text-lg font-medium pt-2 list-disc pl-5">
                        <li>Innovative Leadership</li>
                        <li>Global Impact</li>
                        <li>Sustainable Solutions</li>
                    </ul>
                </div>

                {/* Future Plans */}
                <div className="bg-yellow-600 lg:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-4 lg:mb-0 p-4">
                    <h1 className="text-yellow-100 text-base 2xl:text-xl pl-2">
                        Future Plans
                    </h1>
                    <p className="text-yellow-100 text-base 2xl:text-lg font-medium pt-2">
                        We are committed to continuously evolving and adapting to meet the needs of our customers and stakeholders, ensuring that our solutions remain relevant and impactful.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Vision;
