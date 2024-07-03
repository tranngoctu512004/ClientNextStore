"use client";

import Header from "@/components/header";
import Headerbar from "@/components/headerbar";
import ItemProduct from "@/components/itemproduct";
import envConfig from "@/config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryCollection() {
  const { id } = useParams(); // Lấy id từ params

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/productsByCategory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products by category.");
        }

        const data = await response.json();
        setProducts(data);
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
