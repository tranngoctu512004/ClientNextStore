import Image from "next/image";
import React, { useEffect, useState } from "react";
import DropdownBox from "./dropdowfilter";
import envConfig from "@/config";
import { useParams } from "next/navigation";

export default function Headerbar() {
  const [cate, setCate] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/cate/getCateByID`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cate detail.");
        }

        const data = await response.json();
        setCate(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleSelect = (value) => {
    console.log("Selected option:", value);
  };
  console.log(cate);
  return (
    <div className="flex flex-row m-5 mt-40 justify-between w-auto">
      <div className="hidden lg:block ml-10">
        {cate && (
          <span className="font-bold text-2xl">
            {cate[0].cateName ? cate[0].cateName : cate[0].subcateName}
          </span>
        )}
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
        <text className="hidden lg:block">Sắp xếp theo</text>
        <DropdownBox options={options} onSelect={handleSelect} />
        <text className="hidden lg:flex font-medium text-2xl ml-5 mr-10">
          Sản phẩm bán chạy
        </text>
        <div className="hidden lg:flex flex-row">
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
    </div>
  );
}
