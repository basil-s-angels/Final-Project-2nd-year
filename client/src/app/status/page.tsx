import React from 'react';

const Status = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
        <h1 className='text-center text-3xl font-bold mb-4'>YOUR ORDER</h1>
        <div className="border-t border-gray-300 mb-4"></div>

        <div className="flex items-center justify-center">
          <p className="text-lg font-bold">
            <div className='grid grid-cols-2'>
              <p className='text-left'>Fried Chicken</p><p className='text-right'>Quantity: 2</p>
              <p className='text-left'>Spaghetti</p><p className='text-right'>Quantity: 4</p>
            </div>
            <div className="border-t border-gray-300 mb-2"></div>
            <div className='grid grid-cols-2'>
            </div>
            The status of your order: <strong className='text-blue-600'>PENDING</strong><br></br>
            The status of your order: <strong className='text-yellow-600'>PREPARING</strong><br></br>
            The status of your order: <strong className='text-pink-600'>SERVING</strong><br></br>
            The status of your order: <strong className='text-green-600'>COMPLETED</strong>
          </p><br></br>
        </div>
      </div>
    </div>
  );
};

export default Status;
