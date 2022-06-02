import React, { useEffect, useState } from "react";
import api from "./services/api";
import HourCard from "./Component/HourCard";
import "./App.css"

const App = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    api
      .get("/forecast.json", {
        params: {
          key: "b35dd760809249e9b4f20009220206",
          q: "Sao Marcos Rio Grande do Sul",
        },
      })
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  console.log(data?.forecast.forecastday[0].hour);

  return (
    <div className="App">
      <p className="Data"> Data: {data?.current.last_updated}</p>
      {/* <img className="Image" src= "http://cdn.weatherapi.com/weather/64x64/night/248.png"/>
      <p>Temperatura: {data?.current.temp_c}.C </p>
      <p> Data:</p>
      <p> </p> */}
      <div className="CardsWrapper">{data?.forecast.forecastday[0].hour.map(HourCard)}</div>
    </div>
  );
};
export default App;
