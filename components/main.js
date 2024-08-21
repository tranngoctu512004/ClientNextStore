"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import envConfig from "@/config";
import ImageSlider from "./slider";
import HomeProduct from "./homeproduct";
import Footer from "./footer";
import LoadingOverlay from "./loading";

export default function Main() {
  const [data, setData] = useState({
    categories: [],
    slides: [],
    discountProduct: [],
  });
  const [loading, setLoading] = useState({
    categories: true,
    slides: true,
    discountProduct: true,
  });
  const [error, setError] = useState({
    categories: "",
    slides: "",
    discountProduct: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, slidesResponse, discountResponse] =
          await Promise.all([
            fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/cate/AllCategories`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }),
            fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/slider/getAll`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }),
            fetch(
              `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/productsByCategory`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: "667a89f9d414477f7f42ba1c" }),
              },
            ),
          ]);

        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories.");
        }
        if (!slidesResponse.ok) {
          throw new Error("Failed to fetch slides.");
        }
        if (!discountResponse.ok) {
          throw new Error("Failed to fetch discount products.");
        }

        const [categoriesData, slidesData, discountData] = await Promise.all([
          categoriesResponse.json(),
          slidesResponse.json(),
          discountResponse.json(),
        ]);

        setData({
          categories: categoriesData,
          slides: slidesData,
          discountProduct: discountData,
        });
        setLoading({
          categories: false,
          slides: false,
          discountProduct: false,
        });
      } catch (error) {
        setError((prev) => ({
          ...prev,
          categories: error.message,
          slides: error.message,
          discountProduct: error.message,
        }));
        setLoading({
          categories: false,
          slides: false,
          discountProduct: false,
        });
      }
    };

    fetchData();
  }, []);

  if (loading.categories || loading.slides || loading.discountProduct) {
    return <LoadingOverlay />;
  }

  return (
    <div className="flex flex-col">
      <Header />
      <ImageSlider slides={data.slides} />
      {error.categories && <div>{error.categories}</div>}
      {error.slides && <div>{error.slides}</div>}
      {error.discountProduct && <div>{error.discountProduct}</div>}
      <HomeProduct product={data.discountProduct} />
      <HomeProduct product={data.discountProduct} />
      <Footer />
    </div>
  );
}
