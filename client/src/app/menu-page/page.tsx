"use client"
import React from 'react';
import Image from 'next/image';

const FoodMenuPage = () => {
  const foodItems = [
    { name: 'Margherita Pizza', description: 'Classic cheese and tomato base', price: '$8.99', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing', price: '$5.99', imageUrl: '' },
    { name: 'Spaghetti Carbonara', description: 'Pasta with creamy bacon sauce', price: '$10.99', imageUrl: '' },
    { name: 'Grilled Salmon', description: 'Fresh salmon with a lemon butter glaze', price: '$15.99', imageUrl: '' },
    { name: 'Chocolate Lava Cake', description: 'Warm cake with a gooey chocolate center', price: '$6.99', imageUrl: '' },
  ];

  const handleAddToBasket = (itemName: string) => {
    // Implement the logic to add the item to the basket
    console.log(`${itemName} added to basket!`);
  };

  return (
    <div className='w-[80%] m-auto text-center'>
      <h1>Our Menu</h1>
      <div className='grid grid-cols-3 gap-[10px] p-[10px]'>
        {foodItems.map((item, index) => (
          <div key={index} className='border-[1px] border-[#ccc] text-left h-[300px] flex flex-col justify-between p-2'>
            <div className='w-full h-[150px] relative'>
              <img src={item.imageUrl} alt={item.name} className='mx-auto object-cover h-full w-full'/>
            </div>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p className='font-bold text-white'>{item.price}</p>
            <button onClick={() => handleAddToBasket(item.name)} className='bg-green-700 py-[10px] px-[20px] rounded-[5px] cursor-pointer'>
              Add to Basket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodMenuPage;
