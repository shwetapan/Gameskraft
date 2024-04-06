import React from "react";
import '../../Toggle.css';
const ToggleButton = () => {
    const handleInputClick = () => {
        // Check if the body has the custom-class
        const bodyHasClass = document.body.classList.contains('dark-theme');
        // Toggle the class accordingly
        if (bodyHasClass) {
          document.body.classList.remove('dark-theme'); // Remove the class
        } else {
          document.body.classList.add('dark-theme'); // Add the class
        }
      };
      return (
        <input id="toggle" type="checkbox" onClick={handleInputClick}></input>
      )
};
export default ToggleButton;