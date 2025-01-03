import React from 'react';

const OurMission = () => {
    return (
        <div className="w-full min-h-screen bg-light-golden">
            <div className="flex flex-col lg:grid lg:gap-4 2xl:gap-6 lg:grid-cols-4 lg:grid-rows-2 ml-2 pt-4 px-6 space-y-4 lg:space-y-0">
                {/* Our Mission */}
                <div className="bg-yellow-600 lg:row-span-1 lg:col-span-2 rounded-lg shadow-xl p-4">
                    <h1 className="text-white text-base 2xl:text-xl pl-2 2xl:pl-4">
                        Our Mission
                    </h1>
                    <p className="text-yellow-100 text-base 2xl:text-lg font-medium pt-2">
                        At [Your Company Name], we are committed to creating innovative solutions that enhance the lives of our customers. Our mission is to lead with integrity, inspire creativity, and deliver excellence in every product we offer.
                    </p>
                    <p className="text-yellow-100 text-base 2xl:text-lg font-light pt-2">
                        We believe in pushing the boundaries of technology while maintaining a strong commitment to ethical practices and sustainability. Our goal is to build lasting relationships with our customers, partners, and communities.
                    </p>
                </div>

                {/* Vision */}
                <div className="bg-yellow-700 lg:row-span-1 lg:col-span-1 rounded-lg shadow-xl p-4">
                    <h1 className="text-yellow-100 text-base 2xl:text-xl pl-2">
                        Our Vision
                    </h1>
                    <p className="text-yellow-100 text-base 2xl:text-lg font-medium pt-2">
                        We envision a world where technology and innovation work harmoniously to create a better future for all. Our vision is to be a global leader in technological advancements and to make a positive impact on society through our work.
                    </p>
                </div>

                {/* Values */}
                <div className="bg-yellow-800 lg:row-span-1 lg:col-span-1 rounded-lg shadow-xl p-4">
                    <h1 className="text-yellow-100 text-base 2xl:text-xl pl-2">
                        Our Values
                    </h1>
                    <ul className="text-yellow-100 text-base 2xl:text-lg font-medium pt-2 list-disc pl-5">
                        <li>Integrity</li>
                        <li>Innovation</li>
                        <li>Excellence</li>
                        <li>Sustainability</li>
                    </ul>
                </div>

                {/* Commitment */}
                <div className="bg-yellow-600 lg:row-span-1 lg:col-span-2 rounded-lg shadow-xl p-4">
                    <h1 className="text-yellow-100 text-base 2xl:text-xl pl-2">
                        Our Commitment
                    </h1>
                    <p className="text-yellow-100 text-base 2xl:text-lg font-medium pt-2">
                        We are dedicated to continuous improvement and strive to exceed expectations in every aspect of our business. Our commitment to quality and customer satisfaction drives us to deliver exceptional results and create lasting value.
                    </p>
                </div>
            </div>
            {/* Footer Section */}

        </div>
    );
};

export default OurMission;
