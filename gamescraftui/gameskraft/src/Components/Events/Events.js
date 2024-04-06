import React, { useState, useEffect } from 'react';
import SliderComponent from './Slider';
import EventTile from './EventTile';
import eventsData from './events.json'; // Import event data
import EventSlider from './EventSlider';
function Events() {
  const [events, setEvents] = useState([]);
  const sliderImages = [
    'https://pro-theme.com/html/teamhost/assets/img/t1.jpg',
    'https://pro-theme.com/html/teamhost/assets/img/t2.jpg'
  ];
  useEffect(() => {
    setEvents(eventsData); // Set events from the JSON data
  }, []);

  return (
    <div className="events-page">
      <SliderComponent images={sliderImages} />
      <div className='event-heading' style={{margin: "55px 0"}}>
       <h2  className='event_h2' style={{fontSize: "2em"}}>Upcoming Events</h2>
       </div>
      <div className="event-tiles" style={{margin: '0 auto', width: "75%"}}>       
          <EventSlider events= {events} />
        
      </div>
    </div>
  );
}

export default Events;
