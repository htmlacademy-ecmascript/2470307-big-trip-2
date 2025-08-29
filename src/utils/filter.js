import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import { FilterType } from '../constants.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const isPointInFuture = (point) => dayjs().isBefore(dayjs(point.dateFrom));

const isPointInPresent = (point) => dayjs().isSameOrAfter(dayjs(point.dateFrom)) && dayjs().isSameOrBefore(dayjs(point.dateTo));

const isPointInPast = (point) => dayjs().isAfter(dayjs(point.dateTo));

const filterUtils = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter(isPointInFuture),
  [FilterType.PRESENT]: (points) => points.filter(isPointInPresent),
  [FilterType.PAST]: (points) => points.filter(isPointInPast),
};

export { filterUtils };
