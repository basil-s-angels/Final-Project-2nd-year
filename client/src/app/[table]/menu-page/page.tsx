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
  price: number;
}

type ImageMapping = {
  [key: number]: string;
};

const imageMapping: ImageMapping = {
  1: "/images/caesar_salad.jpg",
  2: "/images/spag_carbonara.jpg",
  3: "/images/grilled_salmon.jpg",
  4: "/images/choco_lava_cake.jpg",
  5: "/images/margherita_pizza.jpg",
  6: "/images/pepperoni_pizza.jpg",
};

export default function FoodMenuPage({
  params,
}: {
  params: { table: number };
}) {
  const tableNum = params.table;
  const [topSellers, setTopSellers] = useState<FoodItem[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [orders, setOrders] = useState<
    {
      itemId: number;
      name: string;
      quantity: number;
      price: number;
      tableNum: number;
    }[]
  >([]);

  function getTime(): string {
    const date = String(new Date()).split(" ");
    const time = Number(date[4].split(":")[0]);
    if (time < 12) {
      return "breakfast";
    } else if (time < 17) {
      return "lunch";
    } else {
      return "dinner";
    }
  }

  useEffect(() => {
    const timeOfDay = getTime();
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/top-sellers/${timeOfDay}`)
      .then((response) => response.json())
      .then((result) => setTopSellers(result))
      .catch((error) => console.error("Error fetching top sellers: ", error));

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/menu-page`)
      .then((response) => response.json())
      .then((data) => {
        setFoodItems(data);
        setQuantities(Array(data.length).fill(1));
      })
      .catch((error) => console.error("Error fetching menu items: ", error));
  }, []);

  const updateQuantity = (itemId: number, increment: boolean): void => {
    setQuantities((prevQuantities) => {
      const itemPosition = foodItems.findIndex((item) => item.id === itemId);

      if (
        itemPosition === -1 ||
        (increment === false && prevQuantities[itemPosition] <= 1)
      ) {
        return prevQuantities;
      } else {
        const updatedQuantities = [...prevQuantities];

        updatedQuantities[itemPosition] += increment ? 1 : -1;

        return updatedQuantities;
      }
    });
  };

  const addQuantity = (itemId: number): void => updateQuantity(itemId, true);

  const minusQuantity = (itemId: number): void => updateQuantity(itemId, false);

  const groupedFoodItems: Record<string, FoodItem[]> = foodItems.reduce(
    (grouped: Record<string, FoodItem[]>, item: FoodItem) => {
      grouped[item.type] = grouped[item.type] || [];
      grouped[item.type].push(item);
      return grouped;
    },
    {},
  );

  const handleAddToBasket = (
    itemId: number,
    name: string,
    quantity: number,
    price: number,
  ): void => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find((order) => order.itemId === itemId);
      if (existingOrder) {
        return prevOrders.map((order) =>
          order.itemId === itemId
            ? { ...order, quantity: order.quantity + quantity }
            : order,
        );
      } else {
        return [...prevOrders, { itemId, name, quantity, price, tableNum }];
      }
    });
  };

  return (
    <div className="w-[85%] m-auto relative">
      <div>
        <h2 className="font-bold xl:text-3xl sm:text-xl mt-2 absolute text-slate-300">
          Table {tableNum}
        </h2>
        <h1 className="font-bold xl:text-5xl text-4xl mt-2 flex justify-center">
          MENU
        </h1>
      </div>
      <h2 className="text-2xl font-semibold text-slate-300 mt-2 text-center">
        Best Sellers
      </h2>
      <hr className="m-3" />
      {topSellers.length === 0 ? (
        <h2 className="grid-cols-1 flex relative justify-center h-full">
          No Current Best Sellers
        </h2>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-[10px] p-[10px] mb-3">
          {topSellers.map((item) => (
            <div
              key={item.id}
              className="border-[1px] border-[#ccc] rounded-lg text-left h-[340px] flex flex-col justify-between p-2"
            >
              <div className="w-full h-[150px] relative">
                <Image
                  src={imageMapping[item.id]}
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
                    <button onClick={() => minusQuantity(item.id)}>-</button>
                    <p className="text-center">
                      {quantities[foodItems.findIndex((i) => i.id === item.id)]}
                    </p>
                    <button onClick={() => addQuantity(item.id)}>+</button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  alert("Item added successfully.");
                  handleAddToBasket(
                    item.id,
                    item.name,
                    quantities[foodItems.findIndex((i) => i.id === item.id)],
                    item.price,
                  );
                }}
                className="bg-green-700 hover:bg-green-600 active:bg-green-800 py-[10px] px-[20px] rounded-[5px] cursor-pointer font-medium"
              >
                Add to Basket
              </button>
            </div>
          ))}
        </div>
      )}
      {Object.entries(groupedFoodItems).map(([category, items]) => (
        <div key={category} className="mb-4 mt-4">
          <h2 className="text-2xl font-semibold capitalize text-slate-300 text-center">
            {category}
          </h2>
          <hr className="m-3" />
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-[10px] p-[10px] mb-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="border-[1px] border-[#ccc] rounded-lg text-left h-[340px] flex flex-col justify-between p-2"
              >
                <div className="w-full h-[150px] relative">
                  <Image
                    src={imageMapping[item.id]}
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
                      <button onClick={() => minusQuantity(item.id)}>-</button>
                      <p className="text-center">
                        {
                          quantities[
                            foodItems.findIndex((i) => i.id === item.id)
                          ]
                        }
                      </p>
                      <button onClick={() => addQuantity(item.id)}>+</button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert("Item added successfully.");
                    handleAddToBasket(
                      item.id,
                      item.name,
                      quantities[foodItems.findIndex((i) => i.id === item.id)],
                      item.price,
                    );
                  }}
                  className="bg-green-700 hover:bg-green-600 active:bg-green-800 py-[10px] px-[20px] rounded-[5px] cursor-pointer font-medium"
                >
                  Add to Basket
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="fixed bottom-0 w-[85%]">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-semibold w-[100%] mt-3 py-3 cursor-pointer bg-green-600 text-white rounded-sm xl:text-xl">
              BASKET
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[80%] mt-7">
            <Ordercart orders={orders} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
