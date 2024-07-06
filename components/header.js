"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./searchbar";
import envConfig from "@/config";
import { useRouter } from "next/navigation";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [errorCategories, setErrorCategories] = useState("");
  const router = useRouter();

  const handleProfile = () => {
    router.push("/login");
  };

  const handleMouseEnter = (categoryId) => {
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/cate/AllCategories`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!categoriesResponse.ok) {
          const errorData = await categoriesResponse.json();
          throw new Error(errorData.error || "Failed to fetch categories.");
        }

        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
        setErrorCategories(""); // Xóa lỗi nếu có lỗi trước đó
      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrorCategories(error.message || "Failed to fetch categories.");
      }
    };

    fetchData();
  }, []);

  console.log(errorCategories);

  return (
    <header
      className={`fixed w-full top-0 z-50 ${scrolled ? "bg-white shadow-lg" : "bg-transparent"}`}
    >
      <div className="flex justify-between items-center px-4 py-2">
        <div className="w-48 md:w-auto">
          <Link href={"/"}>
            <Image
              src="https://mwc.com.vn/Assets/App/images/logo.png"
              alt="Logo"
              width={122}
              height={54}
              className="object-contain"
            />
          </Link>
        </div>

        <ul className="hidden md:flex flex-row space-x-5">
          {categories.map((category) => (
            <li
              key={category._id}
              onMouseEnter={() => handleMouseEnter(category.cateID)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={`/collection/${category._id}`}>
                <span className="font-semibold cursor-pointer hover:text-blue-500">
                  {category.cateName}
                </span>
              </Link>

              {category.subCategories.length > 0 &&
                hoveredCategory === category.cateID && (
                  <ul className="absolute z-10 p-4 bg-white shadow-lg">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory._id} className="py-1">
                        <Link href={`/collection/${subCategory._id}`}>
                          <span className="text-base text-black-700 hover:text-blue-500 font-semibold">
                            {subCategory.subcateName}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>

        <div className="flex space-x-5 items-center">
          <SearchBar />
          <div onClick={handleProfile}>
            <Image
              src="/images/user.svg"
              alt="User Icon"
              width={24}
              height={24}
            />
          </div>
          <div>
            <Link href={`/cart`}>
              <Image
                src="/images/shopping-cart.svg"
                alt="Shopping Cart Icon"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
