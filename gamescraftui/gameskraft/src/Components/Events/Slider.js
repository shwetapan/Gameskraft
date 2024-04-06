import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function SliderComponent({ images }) {
  const settings = {
    dots: true, // Enable dots for navigation
    infinite: true, // Loop through slider images
    autoplay: true, // Enable autoplay (optional)
    autoplaySpeed: 3000, // Autoplay speed in milliseconds (optional)
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
  };

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <img key={image} src={image} alt="Event Slider Image" />
      ))}
    </Slider>
  );
}

export default SliderComponent;
