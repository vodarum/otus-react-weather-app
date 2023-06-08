import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WeatherInfoForDayShort } from "../types";
import { useFetch } from "../hooks/useFetch";
import getWeatherInfoByCity from "../services/weather.service";
import { addCityToSearchHistory } from "../services/storage.service";
import Forecast from "../components/Forecast";
import Loader from "../components/Loader";
import NotFound from "./NotFound";

function Detail() {
  const [weatherInfo, setWeatherInfo] = useState<Array<WeatherInfoForDayShort>>(
    []
  );
  const { city } = useParams();
  const [fetchWeatherInfo, isWeatherInfoLoading, weatherInfoError] = useFetch(
    async () => {
      const weatherInfoByCity = await getWeatherInfoByCity(city ?? "");

      if (weatherInfoByCity.length > 0) {
        addCityToSearchHistory(city as string);
        setWeatherInfo(weatherInfoByCity);
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
            weatherInfo.length > 0 && (
              <Forecast title={city as string} data={weatherInfo} />
            )
          )}
        </>
      )}
    </>
  );
}

export default Detail;
