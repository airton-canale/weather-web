import React from "react";
import "./Cards.css"

const HourCard = (props) => {
  console.log (props)
  return (
   
    <div className="HourCard">
      <p>15:00</p>
      <p>{props.time}</p>
      <img src={props.condition.icon}/>
      <p>8C</p>
    </div>
  );
};
export default HourCard;
