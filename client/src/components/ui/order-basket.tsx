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
  orders: Array<{ itemName: string; quantity: number; price: number }>;
};

const Ordercart: React.FC<OrdercartProps> = ({ orders }) => {
  const [cartItems, setcartItems] = useState<any[]>([]);
  const [quantities, setQuantities] = useState(Array(cartItems.length).fill(1));
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log(orders, "orders");
    setcartItems(orders);
  }, []);

  // const addQuantity = (quantity: number) => {
  //   setQuantities((prevQuantities) => {
  //     const newQuantities = [...prevQuantities];
  //     newQuantities[quantity] += 1;
  //     return newQuantities;
  //   });
  // };

  // const handleAddtoCart = (items: Cartitem) =>{
  //   setcartItems([...cartItems, items])
  // }

  const handleRemoveFromCart = (id: number) => {
    setcartItems(cartItems.filter((item) => item.id != id));
  };

  // const minusQuantity = (index: number): undefined => {
  //   if (quantities[index]> 1) {
  //     setQuantities((prevQuantities) => {
  //       const newQuantities = [...prevQuantities];
  //       newQuantities[index] -= 1;
  //       return newQuantities;
  //     });
  //   }
  // };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const handleCheckout = async () => {
    console.log(cartItems, "cartitems");
    console.log(comment);
    alert("Thank you for choosing us!");

    if (comment.trim() === "") {
      setComment("N/A");
    }

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
    <div className=" min-[320px]:py-4 max-[600px] h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="min-[320px]:text-center max-[600px]:text-lg text-white-500 font-semibold mb-4">
          {" "}
          ORDER SUMMARY
        </h1>
        <div className="flex flex-col md:flex-row gap-3 pt-8">
          <div className="md:w-3/4">
            <div className="min-[320px]:py-2 max-[600px] bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="min-[320px]:text-xs max-[600px]:pl-2 md:text-lg text-left text-blue-600 font-semibold pl-5">
                      {" "}
                      Food Name
                    </th>
                    <th className="min-[320px]:text-xs max-[600px]:pr-2 md:text-lg text-left text-blue-600 font-semibold">
                      {" "}
                      Quantity
                    </th>
                    <th className="min-[320px]:text-xs max-[600px] md:text-lg text-left text-blue-600 font-semibold">
                      {" "}
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td className="py-4">
                        <div className="flex-items-center">
                          <span className="min-[320px]:text-xs max-[600px]:ml-0 md:text-lg text-center text-blue-800 font-semibold ml-2">
                            {" "}
                            {order.itemName}{" "}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex-items-center">
                          {/* <button
                            className="md:border rounded-md md:py-2 md:px-4 md:mr-2 ml-2 text-gray-700 "
                            onClick={minusQuantity(index)}
                          >
                            -
                          </button> */}
                          <span className="min-[320px]:text-xs max-[600px]:pl-2 md:text-lg text-gray-700 w-9 mx-2 md:pl-6">
                            {order.quantity}
                          </span>
                          {/* <button
                            className="md:border rounded-md md:py-2 md:px-4 md:ml-2 text-gray-700 "
                            onClick={() => addQuantity(index)}
                          >
                            +
                          </button> */}
                        </div>
                      </td>
                      <td className="min-[320px]:text-xs max-[600px] md:text-lg text-left text-sm text-gray-800 py-4">
                        {(order.price * order.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="min-[820px] max-[600px]">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="min-[320px]:text-xs max-[600px]:pl-2 md:text-lg text-lg text-gray-600 font-semibold mb-4">
                {" "}
                Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span className="min-[320px]:text-xs max-[600px]:pl-2 md:text-lg text-blue-600 text-xl">
                  Subtotal
                </span>
                <span className="min-[320px]:text-xs max-[600px]:pl-2 md:text-lg text-gray-600 text-center">
                  {calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div>
                <h2 className="min-[320px]:text-xs max-[600px]:pl-2 md:text-lg text-lg text-gray-600 font-semibold mb-4">
                  {" "}
                  Special Instructions
                </h2>
                <input
                  type="textarea"
                  className="break-all text-gray-600 w-full h-20 px-3 border-gray-600"
                  placeholder="Insert Special Message here"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </div>
              <button
                className="min-[320px]:text-xs max-[600px]:pl-2 md:text-lg bg-blue-500 text-white-700 py-2 px-3 rounded-lg mt-4 w-full"
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
