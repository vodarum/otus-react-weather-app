import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WeatherInfoForDayShort } from "../types";
import { useFetch } from "../hooks/useFetch";
import getForecastByCityName from "../services/weather.service";
import { addCityToSearchHistory } from "../services/storage.service";
import Forecast from "../components/Forecast";
import Loader from "../components/Loader";
import NotFound from "./NotFound";

function Detail() {
  const { city } = useParams();

  const [state, setState] = useState<{
    cityName: string;
    forecast: Array<WeatherInfoForDayShort>;
  }>({ cityName: "", forecast: [] });

  const [fetchWeatherInfo, isWeatherInfoLoading, weatherInfoError] = useFetch(
    async () => {
      const { cityName, forecast } = await getForecastByCityName(city ?? "");

      if (forecast.length > 0) {
        addCityToSearchHistory(cityName);
        setState({
          cityName,
          forecast,
        });
      }
    }
  );

  useEffect(() => {
    fetchWeatherInfo();
  }, []);

  return (
    <>
      {isWeatherInfoLoading ? (
        <Loader />
      ) : (
        <>
          {weatherInfoError === "404" ? (
            <NotFound />
          ) : (
            state.forecast.length > 0 && (
              <Forecast cityName={state.cityName} forecast={state.forecast} />
            )
          )}
        </>
      )}
    </>
  );
}

export default Detail;
