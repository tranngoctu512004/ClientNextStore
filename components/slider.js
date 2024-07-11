import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const ImageSlider = ({ slides }) => {
  console.log(slides);
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
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
                src={slide.image}
                alt="Slide Image"
                width={1920}
                height={1080}
                className="object-cover w-full h-full"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

ImageSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ImageSlider;
