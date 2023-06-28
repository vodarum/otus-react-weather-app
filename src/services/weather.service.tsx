import {
  CityForecast,
  ResponseForecast,
  WeatherInfoForDay,
  WeatherInfoForDayShort,
} from "../types";
import {
  getFormatDate,
  getDayShortName,
  getDateWithMonth,
} from "../libs/date.lib";
import { capitalize } from "../libs/string.lib";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast";
const WEATHER_API_KEY = "1cf44d73b10a208539e8d4267c92ac9f";

const getShortForecast = (
  forecastList: Array<WeatherInfoForDay>
): Array<WeatherInfoForDayShort> => {
  const result: Array<WeatherInfoForDayShort> = [];

  if (!forecastList) {
    return result;
  }

  for (const f of forecastList) {
    const formatDate = f.dt_txt.slice(0, 10);
    const fullDate = new Date(formatDate);
    const matches = f.dt_txt.match(/.+\s(03|15):00:00$/);

    if (!matches) {
      continue;
    }

    let weatherInfoIdx = result.findIndex(
      (wi) => wi.date.formatDate === formatDate
    );

    if (weatherInfoIdx === -1) {
      const resultLength = result.push({
        date: {
          dateWithMonth: getDateWithMonth(fullDate),
          dayShortName: getDayShortName(fullDate),
          formatDate,
          fullDate,
        },
        dayTemp: "",
        nightTemp: "",
        icon: f.weather[0].icon,
        weatherCondition: capitalize(f.weather[0].description),
      });

      weatherInfoIdx = resultLength - 1;
    }

    if (matches[1] === "03") {
      const nightTemp = Math.round(f.main.temp);

      result[weatherInfoIdx] = {
        ...result[weatherInfoIdx],
        ...{
          nightTemp: nightTemp <= 0 ? `${nightTemp}` : `+${nightTemp}`,
        },
      };

      continue;
    }

    if (matches[1] === "15") {
      const dayTemp = Math.round(f.main.temp);

      result[weatherInfoIdx] = {
        ...result[weatherInfoIdx],
        ...{
          dayTemp: dayTemp <= 0 ? `${dayTemp}` : `+${dayTemp}`,
          icon: f.weather[0].icon,
          weatherCondition: capitalize(f.weather[0].description),
        },
      };
    }
  }

  const now = new Date();
  const today = getFormatDate(now);
  const todayWeatherInfoIdx = result.findIndex(
    (wi) => wi.date.formatDate === today
  );

  if (todayWeatherInfoIdx === -1) {
    const todayForecast = forecastList.find(
      (fI) => fI.dt_txt.slice(0, 10) === today
    );

    if (todayForecast) {
      const temp = Math.round(todayForecast.main.temp);

      result.unshift({
        date: {
          dateWithMonth: getDateWithMonth(now),
          dayShortName: getDayShortName(now),
          formatDate: today,
          fullDate: now,
        },
        dayTemp: temp <= 0 ? `${temp}` : `+${temp}`,
        nightTemp: "",
        icon: todayForecast.weather[0].icon,
        weatherCondition: capitalize(todayForecast.weather[0].description),
      });
    }
  }

  return result;
};

const getForecastByCityName = async (
  cityName: string
): Promise<CityForecast> => {
  const response = await fetch(
    `${WEATHER_URL}?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`
  );

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const { city, list } = (await response.json()) as ResponseForecast;

  return {
    cityName: city.name,
    forecast: getShortForecast(list),
  };
};

export default getForecastByCityName;
