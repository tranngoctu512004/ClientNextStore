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
    <div className="grid grid-cols-1">
      <Header />
      <Headerbar />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5 p-5">
        {products.map((item, index) => (
          <ItemProduct key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
