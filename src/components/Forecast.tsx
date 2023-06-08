import React, { FC } from "react";
import { ForecastProps } from "../types";
import ForecastDay from "./ForecastDay";

const Forecast: FC<ForecastProps> = ({ title, data }) => (
  <>
    <h1>{title}</h1>

    <div className="forecast">
      {data.map((weatherInfo) => (
        <ForecastDay
          key={weatherInfo.date.formatDate}
          date={weatherInfo.date}
          dayTemp={weatherInfo.dayTemp}
          nightTemp={weatherInfo.nightTemp}
          icon={weatherInfo.icon}
          weatherCondition={weatherInfo.weatherCondition}
        />
      ))}
    </div>
  </>
);

export default Forecast;
