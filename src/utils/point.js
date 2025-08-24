import dayjs from 'dayjs';
import { DateFormat, TRIP_INFO_MAX_DESTINATIONS, INITIAL_COST_VALUE } from '../constants.js';

const sortPointsByDate = (points) => [...points].sort((dateA, dateB) => dayjs(dateA.dateFrom).diff(dayjs(dateB.dateFrom)));

const sortPointsByTime = (points) => [...points].sort((pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom)));

const sortPointsByPrice = (points) => [...points].sort((pointA, pointB) => pointB.basePrice - pointA.basePrice);

/**
 * @description Генерирует заголовок для всего путешествия
 * @param {Array} points - Массив точек
 * @returns {string}
 */
const getTripTitle = (points) => {
  const destinationNames = points.map((point) => point.destination.name);
  if (destinationNames.length > TRIP_INFO_MAX_DESTINATIONS) {
    return `${destinationNames[0]} &mdash; ... &mdash; ${destinationNames[destinationNames.length - 1]}`;
  }
  return destinationNames.join(' &mdash; ');
};

/**
 * @description Генерирует строку с датами начала и конца путешествия
 * @param {Array} points - Массив точек
 * @returns {string}
 */
const getTripDates = (points) => {
  // Массив points отсортирован по дате начала. Берем первую точку.
  const startDate = dayjs(points[0].dateFrom);
  // Чтобы найти правильную дату окончания, нужно найти максимальную дату окончания среди всех точек.
  const endDates = points.map((point) => dayjs(point.dateTo));
  const endDate = dayjs(Math.max.apply(null, endDates));

  if (startDate.format('YYYY-MM') === endDate.format('YYYY-MM')) {
    return `${startDate.format(DateFormat.MONTH_DAY)}&nbsp;&mdash;&nbsp;${endDate.format(DateFormat.DAY)}`;
  }

  return `${startDate.format(DateFormat.MONTH_DAY)}&nbsp;&mdash;&nbsp;${endDate.format(DateFormat.MONTH_DAY)}`;
};

/**
 * @description Считает общую стоимость путешествия
 * @param {Array} points - Массив точек
 * @returns {number}
 */
const getTripCost = (points) => {
  const totalBasePrice = points.reduce((sum, point) => sum + point.basePrice, INITIAL_COST_VALUE);
  const totalOffersPrice = points.reduce((sum, point) => {
    const offersSum = point.offers.reduce((offerSum, offer) => offerSum + offer.price, INITIAL_COST_VALUE);
    return sum + offersSum;
  }, INITIAL_COST_VALUE);

  return totalBasePrice + totalOffersPrice;
};

export {
  sortPointsByDate,
  sortPointsByTime,
  sortPointsByPrice,
  getTripTitle,
  getTripDates,
  getTripCost
};
