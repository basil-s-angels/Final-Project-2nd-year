/* eslint-disable no-unused-vars */
"use client";
// import { Item } from "@radix-ui/react-select";
import React, { useState, useEffect } from "react";
import { Client } from "pg";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type OrdercartProps = {
  orders: Array<{ itemName: string; quantity: number }>;
};

const Ordercart: React.FC<OrdercartProps> = ({ orders }) => {
  const [cartItems, setcartItems] = useState<any[]>([]);
  const [quantities, setQuantities] = useState(Array(cartItems.length).fill(1));
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log(orders, "orders");
    setcartItems(orders);
  }, []);

  const addQuantity = (index: number) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  // const handleAddtoCart = (items: Cartitem) =>{
  //   setcartItems([...cartItems, items])
  // }

  const handleRemoveFromCart = (id: number) => {
    setcartItems(cartItems.filter((item) => item.id != id));
  };

  const minusQuantity = (index: number): undefined => {
    if (quantities[index] > 1) {
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] -= 1;
        return newQuantities;
      });
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item, index) => total + item.price * quantities[index],
      0,
    );
  };

  const handleCheckout = async () => {
    console.log(cartItems, "cartitems");
    console.log(comment);
    alert("Thank you for choosing us!");

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selected: cartItems,
        comment: comment,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result, "shshs"));
  };

  return (
    <div className=" h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className=" md:text-2xl sm:text-sm text-white-500 font-semibold mb-4">
          {" "}
          ORDER SUMMARY
        </h1>
        <div className="flex flex-col md:flex-row gap-4 pt-8">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="md:text-xl sm:text-sm text-left  text-blue-600 font-semibold">
                      {" "}
                      Food Name
                    </th>
                    <th className="md:text-xl sm:text-sm text-left text-blue-600 font-semibold">
                      {" "}
                      Price
                    </th>
                    <th className="md:text-xl sm:text-sm text-left text-blue-600 font-semibold pl-7">
                      {" "}
                      Quantity
                    </th>
                    <th className="md:text-xl sm:text-sm text-left text-blue-600 font-semibold">
                      {" "}
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {orders.map((item, index) => (
                    <tr key={item.id}>
                      <td className="py-4">
                        <div className="flex-items-center">
                          <span className=" text-blue-800 font-semibold pl-4">
                            {" "}
                            {item.name}{" "}
                          </span>
                        </div>
                      </td>
                      <td className="xl:text-lg text-sm py-4 text-gray-700">
                        {" "}
                        {item.price.toFixed(2)}
                      </td>
                      <td className="py-4">
                        <div className="flex-items-center">
                          <button
                            className="md:border rounded-md md:py-2 md:px-4 md:mr-2 ml-2 text-gray-700 "
                            onClick={minusQuantity(index)}
                          >
                            -
                          </button>
                          <span className="text-center text-gray-700 w-9 mx-2">
                            {quantities[index]}
                          </span>
                          <button
                            className="md:border rounded-md md:py-2 md:px-4 md:ml-2 text-gray-700 "
                            onClick={() => addQuantity(index)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="md:text-xl text-sm text-gray-800 py-4">
                        {(item.price * quantities[index]).toFixed()}
                      </td>
                    </tr>
                  ))} */}
                  {orders.map((order, index) => (
                    <p key={index} className="text-black">
                      {order.quantity}x {order.itemName}
                    </p>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg text-gray-600 font-semibold mb-4">
                {" "}
                Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-blue-600 text-xl">Subtotal</span>
                <span className="text-gray-600">
                  {calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div>
                <h2 className="text-lg text-gray-600 font-semibold mb-4">
                  {" "}
                  Special Instructions
                </h2>
                <input
                  type="text"
                  className="text-gray-600 w-full h-20 px-3 border-gray-600"
                  placeholder="Insert Special Message here"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 text-white-700 py-2 px-4 rounded-lg mt-4 w-full"
                onClick={handleCheckout}
              >
                {" "}
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ordercart;
