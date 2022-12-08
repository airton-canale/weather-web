import React from "react";
import "./Cards.css";

const ErrorCard = ({ erro }) => {
  return (
    <div className="CardError">
      <p> {erro}</p>
    </div>
  );
};

export default ErrorCard;
