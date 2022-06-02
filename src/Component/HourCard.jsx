import React from "react";
import moment from "moment"
import "./Cards.css"

const HourCard = ({time,condition,temp_c}) => {
  const dataFormatada = moment(time).format("HH:mm")
  
  return (
   
    <div className="HourCard">
      <p>{dataFormatada}</p>
      <img src={condition.icon}/>
      <p>{temp_c}°</p>
    </div>
  );
};
export default HourCard;
