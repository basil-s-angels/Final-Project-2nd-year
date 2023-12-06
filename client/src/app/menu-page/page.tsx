"use client"
import React from 'react';

const FoodMenuPage = () => {
  const foodItems = [
    { name: 'Margherita Pizza', description: 'Classic cheese and tomato base', price: '$8.99' },
    { name: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing', price: '$5.99' },
    { name: 'Spaghetti Carbonara', description: 'Pasta with creamy bacon sauce', price: '$10.99' },
    { name: 'Grilled Salmon', description: 'Fresh salmon with a lemon butter glaze', price: '$15.99' },
    { name: 'Chocolate Lava Cake', description: 'Warm cake with a gooey chocolate center', price: '$6.99' },
  ];

  const handleAddToBasket = (itemName: string) => {
    // Implement the logic to add the item to the basket
    console.log(`${itemName} added to basket!`);
  };

  return (
    <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
      <h1>Our Menu</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '10px',
        padding: '10px',
      }}>
        {foodItems.map((item, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            padding: '16px',
            textAlign: 'left',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p style={{ fontWeight: 'bold', color: 'white' }}>{item.price}</p>
            <button onClick={() => handleAddToBasket(item.name)} style={{
              backgroundColor: 'green', color: 'white', padding: '10px 20px',
              border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}>Add to Basket</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodMenuPage;
