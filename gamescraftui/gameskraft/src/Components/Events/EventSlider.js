import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EventTile from './EventTile';
import './EventSlider.css';

function EventSlider({ events }) {
  const settings = {
    infinite: true, // Loop through slider items (optional)
    autoplay: true, // Enable autoplay (optional)
    autoplaySpeed: 3000, // Autoplay speed in milliseconds (optional)
    slidesToShow: 3, // Show two events side-by-side
    slidesToScroll: 1, // Scroll one event at a time
};

return (
    <Slider {...settings}>
      {events.map((event) => (
        <EventTile key={event.id} event={event} />
      ))}
    </Slider>
  );
}
export default EventSlider;
          
