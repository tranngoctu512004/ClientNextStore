"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import envConfig from "@/config";
import Header from "@/components/header";
import ImageSliderDetail from "@/components/sliderDetail";
import { useToast } from "@/components/ui/use-toast";
import useUser from "../../hooks/useUser";
import AddToCartModal from "@/components/addtocartmodal";
import Footer from "@/components/footer";
import AuthModal from "@/components/AuthModal";
export default function DetailProduct() {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Lấy id từ params
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };
  const handleCart = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!selectedColor || !selectedSize) {
      toast({
        title: "Warning",
        description: "Vui lòng chọn màu và kích thước",
        status: "warning",
      });
      return;
    }

    const { _id: userId } = user;
    const { _id: productId } = product;
    const quantity = 1; // Số lượng sản phẩm thêm vào giỏ hàng (có thể thay đổi tùy theo logic của bạn)
    const color = selectedColor; // Màu sản phẩm được chọn
    const size = selectedSize; // Kích cỡ sản phẩm được chọn

    try {
      const response = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/cart/addCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, productId, quantity, color, size }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add product to cart.");
      }

      // const data = await response.json();

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast({
        title: "Failed",
        description: "Thêm giỏ hàng thất bại",
        status: "success",
      });
    }
  };
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
      {showAuthModal && <AuthModal onClose={handleCloseAuthModal} />}
      <div className="flex flex-col mt-20 p-5 md:flex-row">
        <div className="w-full md:w-1/2">
          {product && <ImageSliderDetail slides={product.image} />}
        </div>

        <div className="md:ml-4">
          {product && (
            <div className="flex flex-row items-center mt-3">
              <text className="flex flex-row items-center">
                <p className="text-xl font-bold">
                  {product.name} - {product.attribute}
                </p>
              </text>
            </div>
          )}
          {product && (
            <div className="mt-4 mb-3">
              <p className="text-2xl font-bold text-red-600">
                {product.price.toLocaleString("vi-VN")} đ
              </p>
            </div>
          )}
          {product && (
            <div className="mt-2 hidden md:block ">
              <p className="text-lg font-bold">Color</p>
              <div className="flex gap-4 mt-2">
                {product.color.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8  ${color}  rounded-full border border-gray-300 ${selectedColor === color ? "ring-2 ring-red-500" : ""}`}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}
          {product && (
            <div className="mt-2 hidden md:block ">
              <p className="text-lg font-bold">Size</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-start">
                {product.size.map((size) => (
                  <button
                    key={size}
                    className={`border border-gray-300 rounded-md px-4 py-3 text-lg ${selectedSize === size ? "border-red-500 text-red-500" : "border-gray-300 text-black"} hover:bg-gray-100 focus:outline-none`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <h5 className="text-sm">{size}</h5>
                  </button>
                ))}
              </div>
            </div>
          )}

          <text>Hướng dẫn tính size</text>
          <div className="mt-4 mx-2">
            <button className="w-full  border  border-red-500 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
              TÌM SẢN PHẨM TẠI SHOWROOM
            </button>
          </div>

          <div className="hidden md:flex flex-row justify-between my-2  ">
            <button className="bg-red-500 w-full mx-2 text-white  py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
              Mua ngay
            </button>
            <button
              onClick={handleCart}
              className=" w-full border  border-red-500 mx-2 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <div className="w-full fixed bottom-0 bg-white shadow-lg z-50 flex flex-col px-2 md:hidden">
        <div className="flex flex-row justify-between">
          {product && (
            <div className="mt-2">
              {/* <p className="text-lg font-bold">Color</p> */}
              <div className="flex gap-4 mt-2">
                {product.color.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8  ${color}  rounded-full border border-gray-300 ${selectedColor === color ? "ring-2 ring-red-500" : ""}`}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}
          {product && (
            <div className="mt-2">
              {/* <p className="text-lg font-bold">Size</p> */}
              <div className="flex flex-wrap gap-2 mt-2 justify-start">
                {product.size.map((size) => (
                  <button
                    key={size}
                    className={`border border-gray-300 rounded-md p-1 text-lg ${selectedSize === size ? "border-red-500 text-red-500" : "border-gray-300 text-black"} hover:bg-gray-100 focus:outline-none`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <h5 className="text-sm">{size}</h5>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between my-2">
          <button className="bg-red-500 w-full mx-2 text-white  py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
            Mua ngay
          </button>
          <button
            onClick={handleCart}
            className=" w-full border  border-red-500 mx-2 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Footer />
    </div>
  );
}
