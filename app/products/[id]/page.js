"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import envConfig from "@/config";
import Header from "@/components/header";
import ImageSliderDetail from "@/components/sliderDetail";

export default function DetailProduct() {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Lấy id từ params
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/productsDetail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product detail.");
        }

        const data = await response.json();
        setProduct(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Xử lý lỗi tại đây
      }
    };

    if (id) {
      // Kiểm tra nếu có id
      fetchData();
    }
  }, [id]); // Thêm id vào dependency array

  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex flex-row mt-20 p-5">
        <div className="w-2/4">
          {product && <ImageSliderDetail slides={product.image} />}
        </div>

        <div className="ml-8">
          {product && (
            <div className="flex flex-row items-center">
              <text className="flex flex-row items-center">
                <p className="text-xl font-bold">{product.name}</p>
                <p className="text-xl mx-2">-</p>
                <p className="text-xl font-bold">{product.attribute}</p>
              </text>
            </div>
          )}
          {product && (
            <div className="mb-4 mt-8">
              <p className="text-lg font-bold">Color</p>
              <div className="flex gap-4 mt-2">
                {product.color.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full border border-gray-300 ${color.toLowerCase()} ${selectedColor === color ? "ring-2 ring-red-500" : ""}`}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {product && (
            <div className="mb-4 mt-8">
              <p className="text-lg font-bold">Size</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.size.map((size) => (
                  <button
                    key={size}
                    className={`border border-gray-300 rounded-md py-2 px-4 mx-2 text-lg ${selectedSize === size ? "border-red-500 text-red-500" : "border-gray-300 text-black"} hover:bg-gray-100 focus:outline-none`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product && (
            <div className="mb-4">
              <p className="text-lg font-bold text-black">
                {product.price.toLocaleString("vi-VN")}đ
              </p>
            </div>
          )}
          <text>Hướng dẫn tính size</text>
          <div className="mt-4">
            <button className="px-20 border  border-red-500 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
              TÌM SẢN PHẨM TẠI SHOWROOM
            </button>
          </div>
          <div className="mt-4 gap-5">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
              Mua ngay
            </button>
            <button className="ml-7 px-16 border  border-red-500 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
