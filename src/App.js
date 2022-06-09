import React, { useEffect, useState } from "react";
import api from "./services/api";
import HourCard from "./Component/HourCard";
import HeaderCard from "./Component/HeaderCard";
import "./App.css"
import moment from "moment"

const App = (props) => {
  const [dados, setDados] = useState();

  useEffect(() => {
    api
      .get("/forecast.json", {
        params: {
          key: "b35dd760809249e9b4f20009220206",
          q: "Sao Marcos Rio Grande do Sul",
        },
      })
      .then((response) => setDados(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  console.log(dados)
  const dataFormatada = moment(dados?.current.last_updated).format("DD/MM/YYYY - HH:mm")
  return (
    <div className="App">

      <HeaderCard data={dados}></HeaderCard>

      <p className="Data"> Data: {dataFormatada}</p>
      {/* <img className="Image" src= "http://cdn.weatherapi.com/weather/64x64/night/248.png"/>
      <p>Temperatura: {data?.current.temp_c}.C </p>
      <p> Data:</p
      <p> </p> */}
      <div className="CardsWrapper">{dados?.forecast.forecastday[0].hour.map(HourCard)}</div>
    </div>
  );
};
export default App;
