/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface FoodItem {
  itemId: number;
  name: string;
  quantity: number;
  price: number;
}

type OrdercartProps = {
  orders: Array<{
    itemId: number;
    name: string;
    quantity: number;
    price: number;
    tableNum: number;
  }>;
};

const Ordercart: React.FC<OrdercartProps> = ({ orders }) => {
  const [cartItems, setcartItems] = useState<FoodItem[]>([]);
  const [, setQuantities] = useState<number[]>([]);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const tableNum = orders[0] && orders[0].tableNum;

  useEffect(() => {
    console.log(orders, "orders");
    console.log(tableNum);
    setcartItems(orders);
    setQuantities(orders.map(() => 1));
  }, [orders, tableNum]);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const handleRemoveOrder = (id: number) => {
    setcartItems(
      cartItems
        .map((item: FoodItem) => {
          if (item.itemId === id && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else if (item.itemId === id && item.quantity === 1) {
            return null;
          } else {
            return item;
          }
        })
        .filter((item: FoodItem | null): item is FoodItem => item !== null),
    );
  };

  const handleAddOrder = (id: number) => {
    setcartItems(
      cartItems.map((item) => {
        if (item.itemId === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }),
    );
  };

  const handleCheckout = async () => {
    console.log(cartItems, "cartitems");
    const finalComment = comment.trim() === "" ? "N/A" : comment.trim();

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selected: cartItems,
        comment: finalComment,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    // alert("Thank you for choosing us!");
  };

  return (
    <div className=" min-[320px]:py-4 max-[600px] h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="min-[320px]:text-center max-[600px]:text-lg lg:text-2xl text-white-500 font-semibold mb-4">
          {" "}
          ORDER SUMMARY
        </h1>
        <div className="flex flex-col md:flex-row gap-3 pt-8">
          <div className="md:w-3/4">
            <div className="min-[320px]:py-2 max-[600px] bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="min-[320px]:text-xs max-[600px]:pl-2 md:text-lg lg:text-xl text-left text-blue-600 font-semibold pl-5">
                      {" "}
                      Food Name
                    </th>
                    <th className="min-[320px]:text-xs max-[600px]:pr-2 md:text-lg  lg:text-xl text-left text-blue-600 font-semibold">
                      {" "}
                      Quantity
                    </th>
                    <th className="min-[320px]:text-xs max-[600px] md:text-lg lg:text-lg text-left text-blue-600 font-semibold">
                      {" "}
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((order, index) => (
                    <tr key={index}>
                      <td className="py-4">
                        <div className="flex-items-center">
                          <span className="min-[320px]:text-xs max-[600px]:ml-0 md:text-lg text-center text-blue-800 font-semibold ml-2">
                            {order.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex-items-center">
                          <span className="min-[320px]:text-xs max-[600px]:pl-0 md:text-lg text-center text-blue-800 font-semibold">
                            <button
                              onClick={() => handleRemoveOrder(order.itemId)}
                            >
                              -
                            </button>
                          </span>
                          <span className="min-[320px]:text-xs max-[600px]:pl-0 md:text-lg text-gray-700 w-9 mx-2">
                            {order.quantity}
                          </span>
                          <span className="min-[320px]:text-xs max-[600px]:pr-0 md:text-lg text-center text-blue-800 font-semibold">
                            <button
                              onClick={() => handleAddOrder(order.itemId)}
                            >
                              +
                            </button>
                          </span>
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
                <textarea
                  className="text-gray-600 w-full h-20 px-3 border-gray-600"
                  placeholder="Insert Special Message here"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </div>
              <Button
                className="min-[320px]:text-xs max-[600px]:pl-2 md:text-lg bg-blue-500 text-white-700 py-2 px-3 rounded-lg mt-4 w-full"
                onClick={() => {
                  router.push(`/${tableNum}/status`);
                  handleCheckout();
                }}
                variant={"default"}
              >
                {" "}
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ordercart;
