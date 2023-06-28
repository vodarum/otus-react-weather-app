import React, { FC } from "react";
import { WeatherInfoForDayShort } from "../types";

const ForecastDay: FC<WeatherInfoForDayShort> = ({
  date,
  dayTemp,
  nightTemp,
  icon,
  weatherCondition,
}) => (
  <div className="forecast__item forecast-day">
    <div className="forecast-day__name">{date.dayShortName}</div>
    <time className="forecast-day__date">{date.dateWithMonth}</time>
    <img
      className="forecast-day__icon"
      src={`http://openweathermap.org/img/w/${icon}.png`}
      alt=""
    />

    <div className="forecast-day__temp forecast-day__temp_day">{dayTemp}</div>
    <div className="forecast-day__temp forecast-day__temp_night">
      {nightTemp}
    </div>
    <div className="forecast-day__condition">{weatherCondition}</div>
  </div>
);

export default ForecastDay;
