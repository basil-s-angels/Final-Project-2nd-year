/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Ordercart from "@/components/ui/order-basket";
interface FoodItem {
  id: number;
  type: string;
  name: string;
  details: string;
  price: number;
}
type ImageMapping = {
  [key: string]: string;
};
const imageMapping: ImageMapping = {
  "Caesar Salad":
    "https://as2.ftcdn.net/v2/jpg/02/02/48/35/1000_F_202483549_3cDh8uaQ5OJG9GUDsp9YKSQNt69rjucc.jpg",
  "Spaghetti Carbonara":
    "https://as1.ftcdn.net/v2/jpg/06/00/16/22/1000_F_600162257_rnJb3XPSr3arrHECJlb47cnMrNvA76Ys.jpg",
  "Grilled Salmon":
    "https://as1.ftcdn.net/v2/jpg/03/25/35/08/1000_F_325350805_D8PVU73qs1dj5TdWgm9IpuAjJ7sgHacK.jpg",
  "Chocolate Lava Cake":
    "https://as1.ftcdn.net/v2/jpg/06/45/68/86/1000_F_645688685_jeEJGhKe4TQWZuPEyPVpcga5u9WFRpga.jpg",
  "Margherita Pizza":
    "https://t4.ftcdn.net/jpg/02/16/71/25/240_F_216712544_4XA06NXDDg9bBWrtCQ1I2NYn8cIrnZ2h.jpg",
  "Pepperoni Pizza":
    "https://as1.ftcdn.net/v2/jpg/02/16/78/88/1000_F_216788898_nP9aPoisuMzj3IvSKGxJAyCRUiSX1PGe.jpg",
};
export default function FoodMenuPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [quantities, setQuantities] = useState<Array<number>>(
    Array(foodItems.length).fill(1),
  );
  const [orders, setOrders] = useState<
    Array<{ id: number; itemName: string; quantity: number; price: number }>
  >([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/menu-page`)
      .then((response) => response.json())
      .then((data) => {
        setFoodItems(data);
        setQuantities(Array(data.length).fill(1));
      })
      .catch((error) => {
        console.error("Error fetching menu items: ", error);
      });
  }, []);
  console.log(foodItems, "food items with id");
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
  const groupedFoodItems: Record<string, FoodItem[]> = foodItems.reduce(
    (result: any, item) => {
      if (!result[item.type]) {
        result[item.type] = [];
      }
      result[item.type].push(item);
      return result;
    },
    {},
  );
  const handleAddToBasket = (
    id: number,
    itemName: string,
    quantity: number,
    price: number,
  ) => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find(
        (order) => order.itemName === itemName,
      );
      if (existingOrder) {
        return prevOrders.map((order) =>
          order.itemName === itemName
            ? { ...order, quantity: order.quantity + quantity }
            : order,
        );
      } else {
        return [...prevOrders, { id, itemName, quantity, price }];
      }
    });
  };
  return (
    <div className="w-[80%] m-auto text-center">
      <h1 className="font-bold xl:text-5xl text-4xl mt-2">MENU</h1>
      {Object.entries(groupedFoodItems).map(([category, items]) => (
        <div key={category} className="mb-4 mt-4">
          <h2 className="text-2xl font-semibold capitalize text-slate-300">
            {category}
          </h2>
          <hr className="m-3"></hr>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-[10px] p-[10px] mb-3">
            {items.map((item) => (
              <div
                key={item.name}
                className="border-[1px] border-[#ccc] rounded-lg text-left h-[340px] flex flex-col justify-between p-2"
              >
                <div className="w-full h-[150px] relative">
                  <img
                    src={imageMapping[item.name]}
                    alt={item.name}
                    className="mx-auto object-cover h-full w-full"
                  />
                </div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>{item.details}</p>
                <div className="grid grid-cols-2">
                  <p className="font-bold text-white">P{item.price}</p>
                  <div className="grid grid-cols-2 space-x-2">
                    <p>Quantity</p>
                    <div className="grid grid-cols-3 bg-slate-200 text-black rounded-sm">
                      <button onClick={() => minusQuantity(item.name)}>
                        -
                      </button>
                      <p className="text-center">
                        {
                          quantities[
                            foodItems.findIndex((i) => i.name === item.name)
                          ]
                        }
                      </p>
                      <button onClick={() => addQuantity(item.name)}>+</button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleAddToBasket(
                      item.id,
                      item.name,
                      quantities[
                        foodItems.findIndex((i) => i.name === item.name)
                      ],
                      item.price,
                    )
                  }
                  className="bg-green-700 py-[10px] px-[20px] rounded-[5px] cursor-pointer font-medium"
                >
                  Add to Basket
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-semibold w-[100%] mt-3 py-3 cursor-pointer bg-green-600 text-white rounded-sm xl:text-xl">
              BASKET
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[80%]">
            <Ordercart orders={orders} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
