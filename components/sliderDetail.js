// components/ImageSlider.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const ImageSliderDetail = ({ slides }) => {
  console.log(slides);
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id} className="relative w-full h-[500px]">
            {" "}
            {/* Adjust height as needed */}
            <a href={slide.path} className="relative block w-full h-full">
              <Image
                src={slide}
                alt="Slide Image"
                width={1920}
                height={1080} // adjust this to the actual aspect ratio of your images
                className="object-cover w-full h-full"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
ImageSliderDetail.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ImageSliderDetail;
