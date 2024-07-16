import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <button
          className="absolute text-4xl top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
};
Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
