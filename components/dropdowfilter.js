import { useState } from "react";
import PropTypes from "prop-types";

const DropdownBox = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <div className="inline-block relative ">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Tùy chọn</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M9.293 12.707a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L10 10.586 4.707 5.293a1 1 0 00-1.414 1.414l5 5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

DropdownBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DropdownBox;
