import React, { useEffect } from 'react'
import { useDisableMethodMutation, useGetAllPaymentMethodQuery, useUnableMethodMutation } from '../redux/apis/adminApi'
import { toast } from 'sonner'

const PaymentMethod = () => {
    const { data } = useGetAllPaymentMethodQuery()
    const [enable, { isSuccess }] = useUnableMethodMutation()
    const [disable, { isSuccess: disabledSuccess }] = useDisableMethodMutation()

    const handleUpdtae = (id, isActive) => {
        if (isActive) {
            enable(id)
        } else {
            disable(id)
        }
        // console.log(id);
        // console.log(isActive);

    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Method Enable Success")
        }
    }, [isSuccess])
    useEffect(() => {
        if (disabledSuccess) {
            toast.success("Method Disabled Success")
        }
    }, [disabledSuccess])


    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-light-golden dark:bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">#</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 ">Method</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 ">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100 dark:divide-gray-700 dark:border-gray-700">
                    {data && data.map((item, i) => (
                        <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                {i + 1}
                            </td>
                            <td className="px-6 py-4 ">
                                <h1 className='text-2xl text-gray-900 dark:text-gray-100'>{item.method}</h1>
                            </td>
                            <td className="px-6 py-4 ">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-warning"
                                    defaultChecked={item.active}
                                    onChange={e => handleUpdtae(item._id, e.target.checked)}
                                />
                            </td>
                            {/* Mobile View: Stack Data */}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    )
}

export default PaymentMethod
