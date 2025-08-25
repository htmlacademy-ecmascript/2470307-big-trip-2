import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat, MIN_DAYS_FOR_FULL_DURATION_FORMAT, MIN_HOURS_FOR_MEDIUM_DURATION_FORMAT, DURATION_FORMAT_PAD_LENGTH, DURATION_FORMAT_PAD_CHAR } from '../constants.js';

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
  const timeDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

  const formatTwoDigits = (num) => String(num).padStart(DURATION_FORMAT_PAD_LENGTH, DURATION_FORMAT_PAD_CHAR);

  if (timeDuration.asDays() >= MIN_DAYS_FOR_FULL_DURATION_FORMAT) {
    const days = Math.floor(timeDuration.asDays());
    return `${formatTwoDigits(days)}${DateFormat.DAY} ${formatTwoDigits(timeDuration.hours())}${DateFormat.DURATION_HOURS} ${formatTwoDigits(timeDuration.minutes())}${DateFormat.DURATION_MINUTES}`;
  }

  if (timeDuration.asHours() >= MIN_HOURS_FOR_MEDIUM_DURATION_FORMAT) {
    return `${formatTwoDigits(timeDuration.hours())}${DateFormat.DURATION_HOURS} ${formatTwoDigits(timeDuration.minutes())}${DateFormat.DURATION_MINUTES}`;
  }

  return `${formatTwoDigits(timeDuration.minutes())}${DateFormat.DURATION_MINUTES}`;
};

export { formatDateTime, formatDate, formatTime, getTimeDifference };
