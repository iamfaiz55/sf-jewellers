import React from 'react';

const About = () => {
    return (
        <div className="w-full h-screen bg-light-golden">
            <div className="flex flex-col lg:grid lg:gap-4 2xl:gap-6 lg:grid-cols-4 2xl:row-span-2 2xl:pb-8 ml-2 pt-4 px-6">
                {/* Daniel Clifford */}
                <div className="bg-yellow-600 lg:order-1 lg:row-span-1 2xl:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0">
                    <div className="mx-6 my-8 2xl:mx-10">
                        <img
                            className="w-8 md:w-9 lg:w-10 2xl:w-20 h-8 md:h-9 lg:h-10 2xl:h-20 rounded-full border-2 ml-1 lg:ml-3 2xl:ml-0 md:-mt-1 2xl:-mt-4"
                            src="https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="Daniel Clifford"
                        />
                        <h1 className="text-white text-xs md:text-base 2xl:text-2xl pl-12 lg:pl-16 2xl:pl-20 -mt-8 md:-mt-10 lg:-mt-11 2xl:-mt-20 2xl:mx-8">
                            Daniel Clifford
                        </h1>
                        <h2 className="text-yellow-100 text-opacity-80 text-xs md:text-base 2xl:text-2xl pl-12 lg:pl-16 2xl:pl-20 2xl:my-2 2xl:mx-8">
                            Verified Graduate
                        </h2>
                    </div>
                    <div className="-mt-6 relative">
                        <p className="text-yellow-100 text-xl 2xl:text-4xl font-bold px-7 lg:px-9 2xl:pt-6 2xl:mx-2">
                            I received a job offer mid-course, and the subjects I learned were
                            current, if not more so, in the company I joined. I honestly feel
                            I got every penny’s worth.
                        </p>
                        <br />
                        <p className="text-yellow-100 text-opacity-80 font-medium md:text-sm 2xl:text-3xl px-7 lg:px-9 mb-3 2xl:pb-8 2xl:mx-2">
                            “ I was an EMT for many years before I joined the bootcamp. I’ve
                            been looking to make a transition and have heard some people who
                            had an amazing experience here. I signed up for the free intro
                            course and found it incredibly fun! I enrolled shortly thereafter.
                            The next 12 weeks was the best - and most grueling - time of my
                            life. Since completing the course, I’ve successfully switched
                            careers, working as a Software Engineer at a VR startup. ”
                        </p>
                    </div>
                </div>

                {/* Jonathan Walters */}
                <div className="bg-yellow-800 lg:order-2 lg:row-span-1 2xl:row-span-1 lg:col-span-1 rounded-lg shadow-xl pb-4 mb-5 lg:mb-0">
                    <div className="mx-8 2xl:mx-10 my-10">
                        <img
                            className="w-8 md:w-9 2xl:w-20 h-8 md:h-9 2xl:h-20 rounded-full border-2 -ml-1 -mt-2 lg:-mt-4"
                            src="https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="Jonathan Walters"
                        />
                        <h1 className="text-yellow-100 text-xs md:text-base 2xl:text-2xl pl-11 md:pl-12 2xl:pl-24 -mt-8 md:-mt-10 2xl:-mt-16">
                            Jonathan Walters
                        </h1>
                        <h2 className="text-yellow-100 text-xs md:text-base 2xl:text-2xl text-opacity-80 pl-11 md:pl-12 2xl:pl-24">
                            Verified Graduate
                        </h2>
                    </div>
                    <div className="-mt-8 mx-1 lg:mx-2">
                        <p className="text-yellow-100 text-lg lg:text-xl 2xl:text-4xl font-semibold pt-1 px-6 2xl:px-8 lg:pl-5 lg:pr-8">
                            The team was very supportive and kept me motivated
                        </p>
                        <br />
                        <p className="text-yellow-100 text-opacity-80 font-medium md:text-sm 2xl:text-3xl pl-6 lg:pl-5 pr-4 -mt-1 lg:mt-6 2xl:mt-2 2xl:px-8">
                            “ I started as a total newbie with virtually no coding skills. I
                            now work as a mobile engineer for a big company. This was one of
                            the best investments I’ve made in myself. ”
                        </p>
                    </div>
                </div>

                {/* Jeanette Harmon */}
                <div className="bg-yellow-100 lg:order-3 lg:row-span-2 2xl:row-span-1 lg:col-span-1 rounded-lg shadow-xl mb-5 lg:mb-0 2xl:mb-8">
                    <div className="mx-8 my-10 lg:my-8">
                        <img
                            className="w-8 md:w-9 lg:w-11 2xl:w-20 h-8 md:h-9 lg:h-11 2xl:h-20 rounded-full border-2 -mt-3 -ml-1 lg:-ml-0"
                            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="Jeanette Harmon"
                        />
                        <h1 className="text-gray-900 text-xs md:text-base 2xl:text-2xl pl-11 md:pl-12 lg:pl-14 2xl:pl-24 -mt-8 md:-mt-10 lg:-mt-11 2xl:-mt-16">
                            Jeanette Harmon
                        </h1>
                        <h2 className="text-gray-500 text-xs md:text-base 2xl:text-2xl pl-11 md:pl-12 lg:pl-14 2xl:pl-24">
                            Verified Graduate
                        </h2>
                    </div>
                    <div className="-mt-4 ml-5 mr-11">
                        <p className="text-gray-900 text-xl 2xl:text-4xl font-bold px-2 lg:px-3 -mt-6 lg:-mt-5 2xl:mt-12 2xl:pb-6">
                            An overall wonderful and rewarding experience
                        </p>
                        <br />
                        <p className="text-gray-500 font-medium md:text-sm 2xl:text-3xl pl-2 lg:pl-3 lg:pr-4 mb-6 2xl:pt-2 -mt-3">
                            “ Thank you for the wonderful experience! I now have a job I
                            really enjoy, and make a good living while doing something I love.
                            ”
                        </p>
                    </div>
                </div>

                {/* Patrick Abrams */}
                <div className="bg-yellow-700 lg:order-4 lg:row-span-2 2xl:row-span-1 col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0 2xl:mb-8 lg:pb-14 2xl:pb-20">
                    <div className="mx-8 my-8">
                        <img
                            className="w-8 md:w-9 lg:w-10 2xl:w-20 h-8 md:h-9 lg:h-10 2xl:h-20 rounded-full border-2 lg:-mt-3"
                            src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="Patrick Abrams"
                        />
                        <h1 className="text-yellow-100 text-xs md:text-base 2xl:text-2xl pl-12 md:pl-14 2xl:pl-24 -mt-8 md:-mt-10 lg:-mt-11 2xl:-mt-16">
                            Patrick Abrams
                        </h1>
                        <h2 className="text-yellow-100 text-xs md:text-base 2xl:text-2xl text-opacity-80 pl-12 md:pl-14 2xl:pl-24">
                            Verified Graduate
                        </h2>
                    </div>
                    <div className="-mt-8">
                        <p className="text-yellow-100 text-lg md:text-xl 2xl:text-4xl font-bold px-6 lg:px-10">
                            I now have the confidence to start my own business
                        </p>
                        <br />
                        <p className="text-yellow-100 text-opacity-80 font-medium md:text-sm 2xl:text-3xl px-6 lg:px-10">
                            “ The bootcamp was challenging but rewarding. It gave me the
                            skills and confidence I needed to start my own tech company. ”
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
