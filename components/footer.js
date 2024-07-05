import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4 mt-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">HỆ THỐNG CỬA HÀNG</h2>
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2">KHU VỰC TPHCM</h3>
          <ul className="list-disc list-inside">
            <li>
              414-416 Nguyễn Trãi, P.8, Q5.{" "}
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
              >
                Xem bản đồ
              </a>
            </li>
            <li>
              96 Nguyễn Trãi, P3, Q5.{" "}
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
              >
                Xem bản đồ
              </a>
            </li>
            <li>
              214 Nguyễn Trãi, P.Nguyễn Cư Trinh, Q1.{" "}
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
              >
                Xem bản đồ
              </a>
            </li>
            <li>
              126 Hậu Giang, P.6, Q6.{" "}
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
              >
                Xem bản đồ
              </a>
            </li>
            <li>
              124 Nguyễn Thị Thập, P.Bình Thuận, Q7.{" "}
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
              >
                Xem bản đồ
              </a>
            </li>
          </ul>
        </div>
        {/* Các khu vực khác ở đây */}
        <div className="flex justify-center mt-6">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-300">
            © 2024 Shop Giày MWC. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
