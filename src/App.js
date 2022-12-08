import React, { useEffect, useState } from "react";
import api from "./services/api";
import HourCard from "./Component/HourCard";
import HeaderCard from "./Component/HeaderCard";
import "./App.css";
import moment from "moment";
import ErrorCard from "./Component/ErrorCard";

const App = () => {
  const [dados, setDados] = useState();
  const [loc, setLoc] = useState();
  const [erro, setErro] = useState();

  useEffect(() => {
    const appendLocation = (localization) => {
      const newloc = `${localization.coords.latitude},${localization.coords.longitude}`;
      setLoc(newloc);
    };
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(appendLocation, (erro) => {
        if (erro.code === erro.PERMISSION_DENIED)
          setErro(
            "Esse site precisa de autorização para buscar sua localização"
          );
      });
    } else {
      setErro("O navegador não suporta geolocation");
    }
  }, []);

  useEffect(() => {
    if (!loc) return;
    api
      .get("/forecast.json", {
        params: {
          key: process.env.REACT_APP_WEATHER_API_KEY,
          q: loc,
        },
      })
      .then((response) => setDados(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [loc]);

  // console.log(dados)
  const dataFormatada = moment(dados?.current.last_updated).format(
    "DD/MM/YYYY - HH:mm"
  );
  return (
    <div className="App">
      {erro ? (
        <ErrorCard erro={erro} />
      ) : (
        <>
          <HeaderCard data={dados}></HeaderCard>
          <p className="Data"> Data: {dataFormatada}</p>
          <div className="CardsWrapper">
            {dados?.forecast.forecastday[0].hour.map(HourCard)}
          </div>
        </>
      )}
    </div>
  );
};
export default App;
