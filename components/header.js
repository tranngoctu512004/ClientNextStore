"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./searchbar";
import envConfig from "@/config";
import useUser from "../app/hooks/useUser";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("./AuthModal"), { ssr: false });
const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [errorCategories, setErrorCategories] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openedCategory, setOpenedCategory] = useState(null);
  const { user } = useUser();
  const router = useRouter();

  const handleOpenAuthModal = () => {
    if (user) {
      router.push("/profile");
    } else {
      setShowAuthModal(true);
    }
  };

  console.log(errorCategories);

  const handleOpenCart = () => {
    if (user) {
      router.push("/cart");
    } else {
      setShowAuthModal(true);
    }
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };
  const handleOpenSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleCategoryHover = (categoryId) => {
    setHoveredCategory(categoryId);
  };

  const handleCategoryClick = (categoryId) => {
    setOpenedCategory(openedCategory === categoryId ? null : categoryId);
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

  // Memoize the categories list
  const memoizedCategories = useMemo(() => categories, [categories]);

  return (
    <header
      className={`fixed w-full top-0 z-50 ${scrolled ? "bg-white shadow-lg" : "bg-transparent"}`}
    >
      {showAuthModal && <AuthModal onClose={handleCloseAuthModal} />}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="lg:hidden" onClick={handleOpenSidebar}>
          <Image
            src="/images/menu-burger.svg"
            alt="Menu"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <div className="md:w-full md:flex md:justify-center lg:w-40">
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

        <ul className="hidden lg:flex flex-row space-x-5 flex-shrink">
          {memoizedCategories.map((category) => (
            <li
              key={category._id}
              onMouseEnter={() => handleCategoryHover(category.cateID)}
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

        <div className="flex items-center lg:flex-shrink-0 space-x-5">
          <SearchBar />
          <div onClick={handleOpenAuthModal}>
            <Image
              src="/images/user.svg"
              alt="User Icon"
              width={24}
              height={24}
            />
          </div>
          <div onClick={handleOpenCart}>
            <Image
              src="/images/shopping-cart.svg"
              alt="Shopping Cart Icon"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={handleOpenSidebar}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
        style={{ width: "66.6667%" }} // 2/3 of the screen
      >
        <div className="p-4">
          <div className=" flex justify-center flex-col">
            <div className="flex flex-row justify-between">
              <div></div>
              <h2 className="justify-center flex">Menu</h2>
              <div className="flex justify-end" onClick={handleOpenSidebar}>
                <Image
                  src="/images/angle-small-left.svg"
                  alt="Shopping Cart Icon"
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <div className="w-full h-px bg-gray-400"></div>
          </div>

          <ul>
            {memoizedCategories.map((category) => (
              <li key={category._id} className="mb-2">
                <div className=" flex flex-row justify-between font-semibold cursor-pointer hover:text-blue-500 py-2">
                  <Link
                    href={`/collection/${category._id}`}
                    className="w-full h-full"
                  >
                    <div>{category.cateName}</div>
                  </Link>
                  <div
                    className="w-10 h-5"
                    onClick={() => handleCategoryClick(category.cateID)}
                  >
                    <Image
                      src="/images/angle-small-down.svg"
                      alt="Shopping Cart Icon"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>

                {category.subCategories.length > 0 &&
                  openedCategory === category.cateID && (
                    <ul className="pl-4">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
