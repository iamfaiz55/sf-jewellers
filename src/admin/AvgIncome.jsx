// import React from 'react';
import { useGetAvgIncomeQuery } from '../redux/apis/adminApi';

const AvgIncome = () => {
    const { data } = useGetAvgIncomeQuery();

    // Calculate total income over the last 12 months
    const totalIncome = data ? data.reduce((acc, item) => acc + item.totalAmount, 0) : 0;



    return (
        <div className='bg-light-golden flex justify-center p-4'>
            <div className='w-full max-w-md'>

                {/* Display Total Amount */}
                <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
                    <h3 className='text-lg font-semibold'>Total Income (Last 12 Months)</h3>
                    <p className='text-2xl font-bold'>{`$${totalIncome.toLocaleString()}`}</p>
                </div>
                <h2 className='text-center text-2xl font-bold mb-4'>Monthly Income</h2>

                {data && data.length > 0 ? (
                    <ul className='space-y-4'>
                        {data.map((item) => (
                            <li key={`${item.year}-${item.month}`} className='bg-white shadow-md rounded-lg p-4 flex justify-between'>
                                <div>
                                    <h3 className='text-lg font-semibold'>{`${item.year}-${item.month < 10 ? `0${item.month}` : item.month}`}</h3>
                                    <p className='text-gray-500'>Order Count: {item.orderCount}</p>
                                </div>
                                <div className='text-right'>
                                    <p className='text-xl font-bold'>{`$${item.totalAmount.toLocaleString()}`}</p>
                                    <p className='text-gray-400'>Total Amount</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='text-center text-gray-500'>No data available</p>
                )}
            </div>
        </div>
    );
};

export default AvgIncome;
