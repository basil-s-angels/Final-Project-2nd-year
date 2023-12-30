/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Ordercart from "../../order-basket/order-basket";
import Image from "next/image";

interface FoodItem {
  id: number;
  type: string;
  name: string;
  details: string;
  price: string;
}

type ImageMapping = {
  [key: string]: string;
};

const imageMapping: ImageMapping = {
  "Caesar Salad": "/images/caesar_salad.jpg",
  "Spaghetti Carbonara": "/images/spag_carbonara.jpg",
  "Grilled Salmon": "/images/grilled_salmon.jpg",
  "Chocolate Lava Cake": "/images/choco_lava_cake.jpg",
  "Margherita Pizza": "/images/margherita_pizza.jpg",
  "Pepperoni Pizza": "/images/pepperoni_pizza.jpg",
};

export default function FoodMenuPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [quantities, setQuantities] = useState<Array<number>>(
    Array(foodItems.length).fill(1),
  );
  const [orders, setOrders] = useState<
    Array<{ id: number; itemName: string; quantity: number }>
  >([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/menu-page`)
      .then((response) => response.json())
      .then((data) => {
        setFoodItems(data);
        setQuantities(Array(data.length).fill(1));
      })
      .catch((error) => {
        console.error("Error fetching menu items: ", error);
      });
  }, []);
  console.log(orders);

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
        return [...prevOrders, { id, itemName, quantity }];
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
                  <Image
                    src={imageMapping[item.name]}
                    alt={item.name}
                    width={100}
                    height={300}
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
