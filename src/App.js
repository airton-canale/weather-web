import React, { useEffect, useState } from "react";
import api from "./services/api";
import HourCard from "./Component/HourCard";
import HeaderCard from "./Component/HeaderCard";
import "./App.css"
import moment from "moment"

const App = (props) => {
  const [dados, setDados] = useState();
  const [loc, setLoc] = useState();
  const [erro, setErro] = useState();

  var current_position;
  useEffect(() => {
    const appendLocation = ((localization) => {
      var newloc;
      var newloc = `${localization.coords.latitude},${localization.coords.longitude}`
      setLoc(newloc)
      console.log(newloc)
    })
    
    if ('geolocation' in navigator) {
      current_position = navigator.geolocation.getCurrentPosition(appendLocation)
    } else {
      alert('Geolocation API not supported.')
    }
  }, []);

  useEffect(() => {
    api
      .get("/forecast.json", {
        params: {
          key: "b35dd760809249e9b4f20009220206",
          q: loc,
        },
      })
      .then((response) => setDados(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  



  // console.log(dados)
  const dataFormatada = moment(dados?.current.last_updated).format("DD/MM/YYYY - HH:mm")
  return (
    <div className="App">

      <HeaderCard data={dados}></HeaderCard>

      <p className="Data"> Data: {dataFormatada}</p>
      <div className="CardsWrapper">{dados?.forecast.forecastday[0].hour.map(HourCard)}</div>
    </div>
  );
};
export default App;
