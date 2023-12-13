import React from 'react';

const Status = () => {
  return (
    <div className="min-h-screen items-center justify-center bg-gray-800 text-gray-600">
      <div className="flex-grow p-10">
        <div className="box-content p-16 border-4 bg-white rounded-lg shadow-md">
          <h1 className='text-center text-3xl font-bold mb-4'>YOUR ORDER</h1>
          <div className="border-t border-blue-800 mb-4"></div>

          <div className="flex items-center justify-center">
            <p className="text-lg font-bold">
              <div className='grid grid-cols-2'>
                <p className='text-left text-lg'>Fried Chicken</p><p className='text-right'>Quantity: 2</p>
                <p className='text-left text-lg'>Spaghetti</p><p className='text-right'>Quantity: 4</p>
              </div>
              <div className="border-t border-gray-300 mb-2"></div>
              <div className='grid grid-cols-2'>
              </div>
              <div className='p-10'>
              The status of your order: <strong className='text-blue-400 text-lg'>PENDING</strong><br></br>
              The status of your order: <strong className='text-yellow-400 text-lg'>PREPARING</strong><br></br>
              The status of your order: <strong className='text-pink-400 text-lg'>SERVING</strong><br></br>
              The status of your order: <strong className='text-green-400 text-lg'>COMPLETED</strong>
            </div>
            </p><br></br>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;

