"use client"
import React, { useState } from 'react';

interface Employee {
    id: number;
    name: string;
    position: string;
    email: string;

}

interface Order {
    id: number;
    tableNumber: number;
    orderDate: string;
    amount: number;
}

// Example employee data
const employees: Employee = {

    id: 1,
    name: 'thell',
    position: 'waiter',
    email: 'sssssssss',

};

// Example order data
const orders: Order[] = [
    {
        id: 1,
        tableNumber: 5,
        orderDate: '2023-04-06',
        amount: 35.99,
    },
    {
        id: 1,
        tableNumber: 10,
        orderDate: '2023-04-06',
        amount: 300.99,
    },
    {
        id: 1,
        tableNumber: 10,
        orderDate: '2023-04-06',
        amount: 300.99,
    },
    {
        id: 1,
        tableNumber: 10,
        orderDate: '2023-04-06',
        amount: 300.99,
    }
];




const EmployeeDashboard: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="min-h-screen p-8 ">


            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center text-white mb-8">Employee Dashboard</h1> {/* Title */}

                <div className="flex-1">
                    <div className="mb-4 grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12">
                        {/* Placeholder for employee data */}
                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-lg font-semibold text-black">Name: thell</p>
                            <p className="text-lg text-black">ID: 696969</p>
                            {/* Other employee details */}
                        </div>
                        {/* Repeat the above div for each employee */}
                    </div>
                </div>
                <div className="flex justify-between mb-8 p-6 bg-gradient-to-r from-green-300 via-green-500 to-green-700 rounded-lg shadow-lg">
                    <button
                        className="px-10 py-2 bg-transparent text-white rounded hover:bg-green-800 duration-300 ease-in-out transform hover:-translate-y-1 mr-4" // Added right margin to the first button
                    // Replace with your function to show tables like onclick so on
                    >
                        Tables
                    </button>
                    <button
                        className="px-10 py-2 bg-transparent text-white rounded hover:bg-green-800 duration-300 ease-in-out transform hover:-translate-y-1"
                    // Replace with your function to show orders like onclick so on
                    >
                        Orders
                    </button>
                </div>

                <div className="fixed top-0.5 left-2 w-full"> {/* Fixed positioning at the top left corner of the screen */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex justify-start items-center"> {/* Container for the hamburger icon */}
                            <button
                                className="h-12 w-12 flex flex-col justify-center items-center group mr-4"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <div className={`h-1 w-6 my-1 bg-white rounded transition duration-300 ease-in-out ${isOpen ? 'transform rotate-45 translate-y-2.5' : ''}`} />
                                <div className={`h-1 w-6 my-1 bg-white rounded transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`} />
                                <div className={`h-1 w-6 my-1 bg-white rounded transition duration-300 ease-in-out ${isOpen ? 'transform -rotate-45 -translate-y-2.5' : ''}`} />
                            </button>
                        </div>
                        {isOpen && (
                            <div className="absolute top-14 left-0 bg-white p-4 rounded shadow-lg"> {/* Modal positioned below the hamburger icon */}
                                <h3 className=" w-5 text-lg text-center text-black font-semibold mt-2">{employees.name}</h3>
                                <p className="w-5 text-sm text-center text-black text-gray-600">{employees.position}</p>
                                <p className="w-5text-sm text-black text-center">{employees.email}</p>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                        onClick={() => setIsOpen(false)} // Set isOpen to false to close the modal
                                    >
                                        Close
                                    </button>
                                    <button
                                        // this will direct them back to the login page 
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div>


            <div className="flex flex-wrap md:flex-nowrap gap-6 mb-8">
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Done Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                            <thead className="bg-gray-200 text-gray-600">
                                <tr>
                                    <th className="py-3 px-6 text-left text-black">Table No.</th>
                                    <th className="py-3 px-6 text-center text-black">Date</th>
                                    <th className="py-3 px-6 text-right text-black">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left text-black">{order.tableNumber}</td>
                                        <td className="py-3 px-6 text-center text-black">{order.orderDate}</td>
                                        <td className="py-3 px-6 text-right text-black">${order.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default EmployeeDashboard;
