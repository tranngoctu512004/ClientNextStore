import Image from "next/image";
import React, { useEffect, useState } from "react";
import DropdownBox from "./dropdowfilter";
import envConfig from "@/config";

export default function Headerbar() {
  const [products, setProducts] = useState([]);
  console.log(products);
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/cate/AllCategories`,
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

  const handleSelect = (value) => {
    console.log("Selected option:", value);
    // Xử lý khi lựa chọn thay đổi
  };
  return (
    <div className="flex flex-row m-5 mt-40 justify-between">
      <div className="">
        <text className="font-bold text-2xl">Tất cả sản phẩm</text>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Image
          src="/images/bars-filter.svg"
          alt="Logo"
          width={24}
          height={24}
          className="object-contain"
        />
        <text className="mr-10">Bộ lọc</text>
        <text>Sắp xếp theo</text>
        <DropdownBox options={options} onSelect={handleSelect} />
        <text className="font-medium text-2xl ml-5 mr-10">
          Sản phẩm bán chạy
        </text>
        <Image
          src="/images/angle-left.svg"
          alt="Logo"
          width={24}
          height={24}
          className="object-contain bg-gray-700 p-1 rounded-lg "
        />
        <Image
          src="/images/angle-right.svg"
          alt="Logo"
          width={24}
          height={24}
          className="object-contain bg-gray-700 p-1 rounded-lg text-white"
        />
      </div>
    </div>
  );
}
