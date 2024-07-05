import envConfig from "@/config";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import PropTypes from "prop-types";

const CartCompo = ({ cart }) => {
  const [cartState, setCartState] = useState(cart || { items: [] });
  const [totalPrice, setTotalPrice] = useState(cart ? cart.totalPrice : 0);
  const [couponDiscount] = useState(0);
  const shippingFee = 0;
  const { toast } = useToast();

  useEffect(() => {
    if (cart) {
      setCartState(cart);
      setTotalPrice(cart.totalPrice);
    }
  }, [cart]);

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const updateTotalPrice = (items) => {
    const newTotalPrice = items.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);
    setTotalPrice(newTotalPrice);
  };

  const handleIncreaseQuantity = async (item) => {
    try {
      // Update UI first
      const updatedItems = cartState.items.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );
      setCartState((prevState) => ({ ...prevState, items: updatedItems }));
      updateTotalPrice(updatedItems);

      // Then update database
      const response = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/cart/increaseQuantity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: cartState.userId,
            productId: item.productId._id,
            color: item.color,
            size: item.size,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to increase quantity.");
      }
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      // Revert UI to original state or handle error
    }
  };

  const handleDecreaseQuantity = async (item) => {
    try {
      if (item.quantity > 1) {
        // Update UI first
        const updatedItems = cartState.items.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        );
        setCartState((prevState) => ({ ...prevState, items: updatedItems }));
        updateTotalPrice(updatedItems);

        // Then update database
        const response = await fetch("/api/decreaseQuantity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: cartState.userId,
            productId: item.productId._id,
            color: item.color,
            size: item.size,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to decrease quantity.");
        }
      }
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      // Revert UI to original state or handle error
    }
  };

  const handleOrder = () => {
    toast({
      title: "Successful",
      description: "Đặt hàng thành công",
      status: "Success",
    });
  };
  const handleRemoveFromCart = async (item) => {
    try {
      // Update UI first (optional)
      const updatedItems = cartState.items.filter(
        (cartItem) => cartItem._id !== item._id,
      );
      setCartState((prevState) => ({ ...prevState, items: updatedItems }));
      updateTotalPrice(updatedItems);

      // Then update database
      const response = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/cart/removeFromCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: cartState.userId,
            productId: item.productId._id,
            color: item.color,
            size: item.size,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      // Revert UI to original state or handle error
    }
  };

  return (
    <div className="mt-5">
      <div className="grid grid-cols-12 gap-4 p-5">
        <div className="col-span-5">
          <p>Sản phẩm</p>
        </div>
        <div className="col-span-2">
          <p>Đơn giá</p>
        </div>
        <div className="col-span-1">
          <p>Số lượng</p>
        </div>
        <div className="col-span-2 ml-8">
          <p>Số tiền</p>
        </div>
        <div className="col-span-2">
          <p>Thao tác</p>
        </div>
      </div>

      {cartState && cartState.items.length > 0 ? (
        <div className="py-2">
          {cartState.items.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-12 gap-4 items-center border-b border-gray-300 py-4"
            >
              <div className="col-span-5 flex items-center">
                <div className="w-40 h-40 relative">
                  <Image
                    src={item.productId.image[0]}
                    alt={item.productId.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">
                    {truncateString(
                      `${item.productId.name} - ${item.productId.attribute}`,
                      70,
                    )}
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">
                  {item.productId.price.toLocaleString()} VND
                </p>
              </div>
              <div className="col-span-1 flex items-center mr-8">
                <button
                  onClick={() => handleDecreaseQuantity(item)}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l focus:outline-none"
                >
                  -
                </button>
                <p className="text-gray-600 mx-2">{item.quantity}</p>
                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r focus:outline-none"
                >
                  +
                </button>
              </div>

              <div className="col-span-2 ml-5">
                <p className="text-gray-600">
                  {(item.productId.price * item.quantity).toLocaleString()} VND
                </p>
              </div>
              <div className="col-span-2">
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </div>
              <div className="col-span-12 flex flex-row items-center ml-5 w-full">
                <p className="text-gray-600 text-sm">Màu sắc: {item.color}</p>
                <p className="text-gray-600 ml-2 text-sm">
                  Kích cỡ: {item.size}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <div className="my-2">
              <label className="block">Mã Coupon:</label>
              <select className="border border-gray-300 p-2">
                <option>--Chọn--</option>
                <option>Sử dụng điểm (Điểm của bạn: 00)</option>
              </select>
            </div>
            <div className="flex justify-between my-2">
              <span>Tổng tiền hàng</span>
              <span>{totalPrice.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Giảm giá sản phẩm</span>
              <span>-0 đ</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Giảm giá coupon</span>
              <span>- {couponDiscount.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Phí vận chuyển</span>
              <span>{shippingFee.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between my-2 font-semibold">
              <span>TỔNG</span>
              <span>
                {(totalPrice - couponDiscount + shippingFee).toLocaleString()} đ
              </span>
            </div>
            <div className="flex flex-row mt-4">
              <div>
                <h2 className="text-xl font-semibold">THÔNG TIN VẬN CHUYỂN</h2>
                <button className="text-blue-500 underline">
                  Thay đổi thông tin nhận hàng
                </button>
                <div className="mt-2">
                  <p>Người nhận: Trần Ngọc Tú</p>
                  <p>Điện thoại: </p>
                  <p>Địa chỉ: </p>
                </div>
              </div>
              <button
                onClick={() => handleOrder()}
                className="bg-red-500 w-44 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out h-10 ml-auto self-end"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4 px-36 text-center">
          <p className="text-xl font-semibold mb-64">
            Giỏ hàng của bạn đang trống
          </p>
        </div>
      )}
    </div>
  );
};
CartCompo.propTypes = {
  cart: PropTypes.shape({
    userId: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        productId: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          attribute: PropTypes.string.isRequired,
          image: PropTypes.arrayOf(PropTypes.string).isRequired,
          price: PropTypes.number.isRequired,
        }).isRequired,
        color: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
      }),
    ),
    totalPrice: PropTypes.number,
  }),
};

export default CartCompo;
