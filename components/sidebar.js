import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const Sidebar = ({ categories, onSelectCategory }) => {
  return (
    <div className="md:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="mb-2">
              <Link href={`/category/${category.cateID}`}>
                <span
                  onClick={() => onSelectCategory(category.cateID)}
                  className="font-semibold cursor-pointer hover:text-blue-500"
                >
                  {category.cateName}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      cateID: PropTypes.string.isRequired,
      cateName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default Sidebar;
