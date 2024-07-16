"use client";
import Header from "@/components/header";
import envConfig from "@/config";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import CartCompo from "@/components/cart";
import Footer from "@/components/footer";

export default function CartPage() {
  const { user } = useUser();
  const [cart, setCart] = useState();
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user._id) {
        return;
      }
      try {
        const cartResponse = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/cart/getCart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user._id }),
          },
        );
        // console.log(user)
        if (!cartResponse.ok) {
          const errorData = await cartResponse.json();
          throw new Error(errorData.error || "Failed to fetch cart.");
        }

        const cartData = await cartResponse.json();
        setCart(cartData);
        console.log(cartData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [user]);
  console.log(cart);
  return (
    <div>
      <Header />
      <div className=" px-5 pt-24 lg:mx-36">
        <text>Trang chủ | Giỏ hàng</text>
        <CartCompo cart={cart} />
        <Footer />
      </div>
    </div>
  );
}
