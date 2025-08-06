import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import { FilterType } from '../constants.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

/**
 * @description Проверяет, находится ли точка в будущем
 * @param {Object} point - Точка маршрута
 * @returns {boolean}
 */
const isPointInFuture = (point) => dayjs().isBefore(dayjs(point.dateFrom));
/**
 * @description Проверяет, находится ли точка в настоящем
 * @param {Object} point - Точка маршрута
 * @returns {boolean}
 */
const isPointInPresent = (point) => dayjs().isSameOrAfter(dayjs(point.dateFrom)) && dayjs().isSameOrBefore(dayjs(point.dateTo));
/**
 * @description Проверяет, находится ли точка в прошлом
 * @param {Object} point - Точка маршрута
 * @returns {boolean}
 */
const isPointInPast = (point) => dayjs().isAfter(dayjs(point.dateTo));

/**
 * @description Объект с функциями фильтрации
 */
const filterUtils = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter(isPointInFuture),
  [FilterType.PRESENT]: (points) => points.filter(isPointInPresent),
  [FilterType.PAST]: (points) => points.filter(isPointInPast),
};

export { filterUtils };
