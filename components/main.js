"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import envConfig from "@/config";
import ImageSlider from "./slider";
import HomeProduct from "./homeproduct";
import Footer from "./footer";
import LoadingOverlay from "./loading";

export default function Main() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState("");

  const [slides, setSlides] = useState([]);
  const [loadingSlides, setLoadingSlides] = useState(true);
  const [errorSlides, setErrorSlides] = useState("");

  const [discountProduct, setDiscountProduct] = useState([]);
  const [loadingDiscount, setLoadingDiscount] = useState(true);
  const [errorDiscount, setErrorDiscount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log(categories);
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

        const categoriesData = await categoriesResponse.json();
        const slidesData = await slidesResponse.json();
        const discountData = await discountResponse.json();

        if (!categoriesResponse.ok) {
          throw new Error(
            categoriesData.error || "Failed to fetch categories.",
          );
        }
        if (!slidesResponse.ok) {
          throw new Error(slidesData.error || "Failed to fetch slides.");
        }
        if (!discountResponse.ok) {
          throw new Error(
            discountData.error || "Failed to fetch discount products.",
          );
        }

        setCategories(categoriesData);
        setSlides(slidesData);
        setDiscountProduct(discountData);

        setLoadingCategories(false);
        setLoadingSlides(false);
        setLoadingDiscount(false);
      } catch (error) {
        setErrorCategories(error.message || "Failed to fetch categories.");
        setErrorSlides(error.message || "Failed to fetch slides.");
        setErrorDiscount(error.message || "Failed to fetch discount products.");

        setLoadingCategories(false);
        setLoadingSlides(false);
        setLoadingDiscount(false);
      }
    };

    fetchData();
  }, []);

  if (loadingCategories || loadingSlides || loadingDiscount) {
    return <LoadingOverlay />; // Hiển thị thông báo loading nếu đang fetch dữ liệu
  }

  return (
    <div className="flex flex-col ">
      <Header />
      <ImageSlider slides={slides} />
      {errorCategories && <div>{errorCategories}</div>}
      {errorSlides && <div>{errorSlides}</div>}
      {errorDiscount && <div>{errorDiscount}</div>}
      <HomeProduct product={discountProduct} />
      <HomeProduct product={discountProduct} />
      <Footer />
    </div>
  );
}
