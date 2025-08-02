import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat } from '../constants.js';

dayjs.extend(duration);

/**
 * @description Форматирует дату и время (e.g., '11/07/25 03:58')
 * @param {string|Date} date - Дата
 * @returns {string}
 */
const formatDateTime = (date) => dayjs(date).format(DateFormat.DAY_MONTH_YEAR_HOUR_MINUTE);

/**
 * @description Форматирует дату (e.g., 'Jul 11')
 * @param {string|Date} date - Дата
 * @returns {string}
 */
const formatDate = (date) => dayjs(date).format(DateFormat.MONTH_DAY);
/**
 * @description Форматирует время (e.g., '03:58')
 * @param {string|Date} date - Дата
 * @returns {string}
 */
const formatTime = (date) => dayjs(date).format(DateFormat.HOUR_MINUTE);
/**
 * @description Вычисляет разницу во времени и форматирует её
 * @param {string|Date} dateFrom - Начальная дата
 * @param {string|Date} dateTo - Конечная дата
 * @returns {string}
 */
const getTimeDifference = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  const datesDifference = date2.diff(date1);
  const durationObject = dayjs.duration(datesDifference);

  if (durationObject.asHours() < 1) {
    return durationObject.format(DateFormat.DURATION_MINUTE);
  }

  if (durationObject.asDays() < 1) {
    return durationObject.format(DateFormat.DURATION_HOUR_MINUTE);
  }

  return durationObject.format(DateFormat.DURATION_DAY_HOUR_MINUTE);
};

export { formatDateTime, formatDate, formatTime, getTimeDifference };
