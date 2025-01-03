import React from 'react';

const teamMembers = [
    {
        name: "Dany Bailey",
        role: "Software Engineer",
        image: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    },
    {
        name: "Lucy Carter",
        role: "Graphic Designer",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    },
    {
        name: "Jade Bradley",
        role: "Dev Ops",
        image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80",
    },
    // Repeat items or add more team members as needed
];

const Team = () => {
    return (
        <section className=" mx-auto px-4 sm:px-6 lg:px-4 py-12 bg-light-golden">
            <div className="text-center pb-12">
                <h2 className="text-base font-bold text-yellow-600">
                    We have the best equipment
                </h2>
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
                    Check our awesome team members
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                    <div key={index} className="w-full bg-white rounded-lg shadow-md p-12 flex flex-col justify-center items-center border border-yellow-500">
                        <div className="mb-8">
                            <img
                                className="object-center object-cover rounded-full h-36 w-36"
                                src={member.image}
                                alt={member.name}
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-xl text-gray-700 font-bold mb-2">{member.name}</p>
                            <p className="text-base text-gray-400 font-normal">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;
