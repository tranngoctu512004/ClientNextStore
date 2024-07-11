import React from "react";
import PropTypes from "prop-types";
import Image from "next/image"; // Sử dụng next/image thay cho thẻ img

export default function ItemProduct({ item }) {
  const formattedPrice = item.price.toLocaleString("vi-VN");
  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const navigateToDetailPage = () => {
    window.location.href = `/products/${item._id}`;
  };

  return (
    <div
      className="flex flex-col cursor-pointer mb-5"
      onClick={navigateToDetailPage}
    >
      <div className="">
        {item.image && item.image.length > 0 && (
          <Image src={item.image[0]} alt={item.name} width={300} height={300} />
        )}
      </div>
      <div className="">
        <div className="grid grid-rows-1 items-center mb-2 mt-2">
          <p className="text-sm font-semibold mr-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {/* Hiển thị chuỗi rút gọn theo kích thước màn hình */}
            <span className="block sm:hidden">
              {item.name} - {truncateString(item.attribute, 10)}
            </span>
            <span className="hidden sm:block md:hidden">
              {item.name} - {truncateString(item.attribute, 10)}
            </span>
            <span className="hidden md:block lg:hidden">
              {item.name} - {truncateString(item.attribute, 15)}
            </span>
            <span className="hidden lg:block xl:hidden">
              {item.name} - {truncateString(item.attribute, 20)}
            </span>
            <span className="hidden xl:block">
              {item.name} - {truncateString(item.attribute, 25)}
            </span>
          </p>
        </div>
        <p className="text-black-700 font-bold justify-center flex text-xl">
          {formattedPrice}đ
        </p>
      </div>
    </div>
  );
}

ItemProduct.propTypes = {
  item: PropTypes.shape({
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    attribute: PropTypes.string.isRequired,
  }).isRequired,
};
