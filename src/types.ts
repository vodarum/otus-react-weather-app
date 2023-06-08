type Forecast = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<WeatherInfoForDay>;
  city: City;
};

type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type Coord = {
  lat: number;
  lon: number;
};

type WeatherInfoForDay = {
  dt: number;
  main: WeatherInfoMain;
  weather: Array<WeatherInfoDescription>;
  clouds: WeatherInfoClouds;
  wind: WeatherInfoWind;
  visibility: number;
  pop: number;
  sys: WeatherInfoSys;
  dt_txt: string;
};

type WeatherInfoMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type WeatherInfoDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type WeatherInfoWind = {
  speed: number;
  deg: number;
  gust: number;
};

type WeatherInfoClouds = {
  all: number;
};

type WeatherInfoSys = {
  pod: string;
};

type DayShortName = "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Вс";

type WeatherInfoForDayShort = {
  date: {
    dateWithMonth: string;
    dayShortName: DayShortName;
    formatDate: string;
    fullDate: Date;
  };
  dayTemp: string;
  nightTemp: string;
  icon: string;
  weatherCondition: string;
};

type ForecastProps = {
  title: string;
  data: Array<WeatherInfoForDayShort>;
};

export type {
  DayShortName,
  Forecast,
  WeatherInfoForDayShort,
  WeatherInfoForDay,
  ForecastProps,
};
