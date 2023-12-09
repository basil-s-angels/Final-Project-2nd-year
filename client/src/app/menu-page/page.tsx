"use client"
import React, { useState } from 'react';

interface FoodItem {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  type: string;
}

const FoodMenuPage: React.FC = () => {
  const foodItems: FoodItem[] = [
    { name: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing', price: '$5.99', imageUrl: 'https://as2.ftcdn.net/v2/jpg/02/02/48/35/1000_F_202483549_3cDh8uaQ5OJG9GUDsp9YKSQNt69rjucc.jpg', type: 'appetizer' },
    { name: 'Spaghetti Carbonara', description: 'Pasta with creamy bacon sauce', price: '$10.99', imageUrl: 'https://as1.ftcdn.net/v2/jpg/06/00/16/22/1000_F_600162257_rnJb3XPSr3arrHECJlb47cnMrNvA76Ys.jpg', type: 'main' },
    { name: 'Grilled Salmon', description: 'Fresh salmon with a lemon butter glaze', price: '$15.99', imageUrl: 'https://as1.ftcdn.net/v2/jpg/03/25/35/08/1000_F_325350805_D8PVU73qs1dj5TdWgm9IpuAjJ7sgHacK.jpg', type: 'main' },
    { name: 'Chocolate Lava Cake', description: 'Warm cake with a gooey chocolate center', price: '$6.99', imageUrl: 'https://as1.ftcdn.net/v2/jpg/06/45/68/86/1000_F_645688685_jeEJGhKe4TQWZuPEyPVpcga5u9WFRpga.jpg', type: 'dessert' },
    { name: 'Margherita Pizza', description: 'Classic cheese and tomato base', price: '$8.99', imageUrl: 'https://t4.ftcdn.net/jpg/02/16/71/25/240_F_216712544_4XA06NXDDg9bBWrtCQ1I2NYn8cIrnZ2h.jpg', type: 'pizza' },
    { name: 'Pepperoni Pizza', description: 'Mozzarella cheese, salami, pepper, tomatoes, spices and fresh basil', price: '9.99', imageUrl: 'https://as1.ftcdn.net/v2/jpg/02/16/78/88/1000_F_216788898_nP9aPoisuMzj3IvSKGxJAyCRUiSX1PGe.jpg', type: 'pizza' }
  ];

  const [quantities, setQuantities] = useState<Array<number>>(Array(foodItems.length).fill(1));

  const addQuantity = (itemName: string) => {
    setQuantities((prevQuantities) => {
      const itemIndex = foodItems.findIndex((item) => item.name === itemName);
      if (itemIndex !== -1) {
        const newQuantities = [...prevQuantities];
        newQuantities[itemIndex] += 1;
        return newQuantities;
      }
      return prevQuantities;
    });
  };
  
  const minusQuantity = (itemName: string) => {
    setQuantities((prevQuantities) => {
      const itemIndex = foodItems.findIndex((item) => item.name === itemName);
      if (itemIndex !== -1 && prevQuantities[itemIndex] > 1) {
        const newQuantities = [...prevQuantities];
        newQuantities[itemIndex] -= 1;
        return newQuantities;
      }
      return prevQuantities;
    });
  };
  

  const handleAddToBasket = (itemName: string, quantity: number) => {
    // Implement the logic to add the item to the basket
    console.log(`${itemName} added to basket with quantity: ${quantity}`);
  };

  // Group food items by types
  const groupedFoodItems: Record<string, FoodItem[]> = foodItems.reduce((result: any, item) => {
    if (!result[item.type]) {
      result[item.type] = [];
    }
    result[item.type].push(item);
    return result;
  }, {});

  return (
    <div className='w-[80%] m-auto text-center'>
      <h1 className='xl:text-5xl text-4xl mt-2'>MENU</h1>
      {Object.entries(groupedFoodItems).map(([category, items]) => (
        <div key={category} className='mb-4 mt-4'>
          <h2 className='text-2xl font-semibold capitalize text-slate-300'>{category}</h2>
          <hr className='m-3'></hr>
          <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-[10px] p-[10px] mb-3'>
            {items.map((item) => (
              <div key={item.name} className='border-[1px] border-[#ccc] rounded-lg text-left h-[340px] flex flex-col justify-between p-2'>
                <div className='w-full h-[150px] relative'>
                  <img src={item.imageUrl} alt={item.name} className='mx-auto object-cover h-full w-full'/>
                </div>
                  <h2 className='font-semibold'>{item.name}</h2>
                  <p>{item.description}</p>
                  <div className='grid grid-cols-2'>
                    <p className='font-bold text-white'>{item.price}</p>
                    <div className='grid grid-cols-2 space-x-2'>
                      <p>Quantity</p>
                      <div className='grid grid-cols-3 bg-slate-200 text-black rounded-sm'>
                        <button onClick={() => minusQuantity(item.name)}>-</button>
                        <p className='text-center'>{quantities[foodItems.findIndex((i) => i.name === item.name)]}</p>
                        <button onClick={() => addQuantity(item.name)}>+</button>
                      </div>
                    </div>
                  </div>
                <button onClick={() => handleAddToBasket(item.name, quantities[foodItems.findIndex((i) => i.name === item.name)])} className='bg-green-700 py-[10px] px-[20px] rounded-[5px] cursor-pointer font-medium'>
                  Add to Basket
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className='font-bold xl:w-[100%] w-[95%] mt-3 py-3 cursor-pointer bg-green-600 rounded-sm xl:text-xl'>Basket</button>
    </div>
  );
};

export default FoodMenuPage
