import dayjs from 'dayjs';
import { DateFormat, TRIP_INFO_MAX_DESTINATIONS } from '../constants.js';

const sortPointsByDate = (points) => [...points].sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));

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
  const startDate = dayjs(points[0].dateFrom);
  const endDate = dayjs(points[points.length - 1].dateTo);

  if (startDate.month() === endDate.month()) {
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
  const totalBasePrice = points.reduce((sum, point) => sum + point.basePrice, 0);
  const totalOffersPrice = points.reduce((sum, point) => {
    const offersSum = point.offers.reduce((offerSum, offer) => offerSum + offer.price, 0);
    return sum + offersSum;
  }, 0);

  return totalBasePrice + totalOffersPrice;
};

export {
  sortPointsByDate,
  getTripTitle,
  getTripDates,
  getTripCost
};
