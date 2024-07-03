"use client";
import Header from "@/components/header";
import Headerbar from "@/components/headerbar";
import envConfig from "@/config";
import React, { useState, useEffect } from "react";
import ItemProduct from "@/components/itemproduct";
export default function Collection() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/getAllProduct`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!productsResponse.ok) {
          const errorData = await productsResponse.json();
          throw new Error(errorData.error || "Failed to fetch categories.");
        }

        const categoriesData = await productsResponse.json();
        setProducts(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col">
      <Header />
      <Headerbar />
      <div className="flex flex-wrap justify-center mt-5 gap-5">
        {products.map((item, index) => (
          <div key={index} className="w-1/5">
            <ItemProduct item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
