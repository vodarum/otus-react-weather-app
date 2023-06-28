import { DayShortName } from "../types";
import { capitalize } from "./string.lib";

const getDayShortName = (d: Date): DayShortName => {
  const dayName = d.toLocaleDateString("ru-RU", { weekday: "short" });

  return capitalize(dayName) as DayShortName;
};

const getFormatDate = (d: Date) =>
  [
    d.getFullYear(),
    `0${d.getMonth() + 1}`.slice(-2),
    `0${d.getDate()}`.slice(-2),
  ].join("-");

const getDateWithMonth = (d: Date): string => {
  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return `${d.getDate()} ${monthNames[d.getMonth()]}`;
};

export { getFormatDate, getDayShortName, getDateWithMonth };
