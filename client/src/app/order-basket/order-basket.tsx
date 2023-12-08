"use client"
import { Item } from "@radix-ui/react-select";
import React, {useState} from "react";

interface CartItem{
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageurl: string;
}

const Ordercart: React.FC = () => {
    const [cartItems, setcartItems] = useState<CartItem[]>([
        {id: 1, name: 'Hamburger', price: 300, quantity: 1, imageurl: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/M6HASPARCZHYNN4XTUYT7H6PTE.jpg'},
        {id: 2, name: 'Italian Pizza', price: 399, quantity: 1, imageurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5gNuIAb__tptA0QHpxisWbSc46w7k4phPLA&usqp=CAU'}

    ])

    const [quantities, setQuantities] = useState(Array(cartItems.length).fill(1));

    const addQuantity = (index: number) => {
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] += 1;
        return newQuantities;
      });
    };
  
    const minusQuantity = (index: number) => {
      if (quantities[index] > 1) {
        setQuantities((prevQuantities) => {
          const newQuantities = [...prevQuantities];
          newQuantities[index] -= 1;
          return newQuantities;
        });
      }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item, index) => total + item.price * quantities[index], 0);
      };
    

    const handleCheckout = () => {
        alert('Thank you for choosing us!')
    }
    return (
        
            <div className=" h-screen py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl text-white-500 font-semibold mb-4"> ORDER SUMMARY</h1>
                    <div className="flex flex-col md:flex-row gap-4 pt-8">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left text-xl text-blue-600 font-semibold"> Food Name</th>
                                            <th className="text-left text-xl text-blue-600 font-semibold"> Price</th>
                                            <th className="text-left text-xl text-blue-600 font-semibold pl-6"> Quantity</th>
                                            <th className="text-left text-xl text-blue-600 font-semibold"> total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) =>(
                                        <tr key={item.id}>
                                            <td className="py-4">
                                                <div className="flex-items-center">
                                                    <img className ="h-20 w-18 mr-4" src={item.imageurl} alt="Food image 1" />
                                                    <span className=" text-blue-800 font-semibold pl-4"> {item.name} </span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-gray-700"> {item.price.toFixed(2)}</td>
                                            <td className="py-4">
                                                <div className="flex-items-center">
                                                    <button className="border rounded-md py-2 px-4 mr-2 text-gray-700" onClick={() => minusQuantity(index)}>-</button>
                                                    <span className="text-center text-gray-700 w-9 mx-2">{quantities[index]}</span>
                                                    <button className="border rounded-md py-2 px-4 ml-2 text-gray-700" onClick={() => addQuantity(index)}>+</button>
                                                </div>
                                            </td>
                                            <td className=" text-gray-800 py-4">{item.price * quantities[index]}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="md:w-1/4">
                        
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg text-gray-600 font-semibold mb-4"> Summary</h2>
                                
                                <div className="flex justify-between mb-2">
                                    <span className="text-blue-600 text-xl">Subtotal</span>
                                    <span className="text-gray-600">{calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div>
                                    <h2 className="text-lg text-gray-600 font-semibold mb-4"> Special Instructions</h2>
                                    <input type="text" className="text-gray-600 w-full h-20 px-3 border-gray-600" placeholder="Insert Special Message here"/>
                                </div>
                                <button className="bg-blue-500 text-white-700 py-2 px-4 rounded-lg mt-4 w-full" onClick={() => handleCheckout}> Place Order</button>
                            </div>
                            
                        </div>
                        
                    </div>

                </div>
    

            </div>
    )
}

export default Ordercart