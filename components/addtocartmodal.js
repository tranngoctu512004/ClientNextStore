import React from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const AddToCartModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  const handleViewCart = () => {
    router.push("/cart");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-start justify-end z-50 mt-12">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-50">
        <h2 className="text-sm font-bold mb-4">
          Thêm vào giỏ hàng thành công!
        </h2>
        <button
          onClick={handleViewCart}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Xem giỏ hàng
        </button>
        <button
          onClick={onClose}
          className="ml-4 px-4 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

AddToCartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddToCartModal;
