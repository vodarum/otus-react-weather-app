import React, { FC } from "react";
import { CityForecast } from "../types";
import ForecastDay from "./ForecastDay";

const Forecast: FC<CityForecast> = ({ cityName, forecast }) => (
  <>
    <h1>{cityName}</h1>

    <div className="forecast">
      {forecast.map(({ date, dayTemp, nightTemp, icon, weatherCondition }) => (
        <ForecastDay
          key={date.formatDate}
          date={date}
          dayTemp={dayTemp}
          nightTemp={nightTemp}
          icon={icon}
          weatherCondition={weatherCondition}
        />
      ))}
    </div>
  </>
);

export default Forecast;
