import React from "react";
import PropTypes from "prop-types";
import ItemProduct from "./itemproduct"; // Đảm bảo đúng tên component import vào

const HomeProduct = ({ product }) => {
  const productsToDisplay = product.slice(0, 4);

  return (
    <div className="flex flex-col mt-3">
      <h2 className="flex justify-center text-xl">GIÁ ƯU ĐÃI</h2>
      <div className="flex flex-row mt-5 p-5 gap-5">
        {productsToDisplay.map((item, index) => (
          <ItemProduct key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

HomeProduct.propTypes = {
  product: PropTypes.arrayOf(
    PropTypes.shape({
      // Định nghĩa kiểu của từng đối tượng trong mảng product nếu cần
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      // Các thuộc tính khác của đối tượng product
    }),
  ).isRequired,
};

export default HomeProduct;
