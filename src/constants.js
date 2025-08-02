/** Количество точек для отрисовки */
const POINT_COUNT_RENDER = 3;
/** Начальное количество точек для отрисовки (для цикла) */

/** Диапазон базовой цены */
const BasePrice = {
  MIN: 99,
  MAX: 9999
};

/** Форматы дат */
const DateFormat = {
  MONTH_DAY: 'MMM D',
  DAY: 'D',
  HOUR_MINUTE: 'HH:mm',
  DAY_MONTH_YEAR_HOUR_MINUTE: 'DD/MM/YY HH:mm',
  DURATION_MINUTE: 'mm[M]',
  DURATION_HOUR_MINUTE: 'HH[H] mm[M]',
  DURATION_DAY_HOUR_MINUTE: 'DD[D] HH[H] mm[M]'
};

/** Типы фильтров */
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST:'past'
};

/** Типы сортировки */
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer',
};

export {
  BasePrice,
  DateFormat,
  POINT_COUNT_RENDER,
  FilterType,
  SortType
};
