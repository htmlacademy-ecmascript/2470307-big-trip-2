/** Количество точек для отрисовки */
const POINT_COUNT_RENDER = 5;
/** Максимальное количество городов в шапке */
const TRIP_INFO_MAX_DESTINATIONS = 3;

const SUGGESTED_TIME_OFFSET_IN_HOURS = 1;
const MIN_PRICE_VALUE = 0;

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
  FLATPICKR: 'd/m/y H:i',
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

/** Сообщения для пустых списков */
const EmptyListMessages = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

/** Типы сортировки */
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer',
};

/** Режимы отображения точки */
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    description: null,
    name: '',
    pictures: []
  },
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const TimeUnit = {
  HOUR: 'hour'
};

export {
  BasePrice,
  DateFormat,
  POINT_COUNT_RENDER,
  FilterType,
  SortType,
  TRIP_INFO_MAX_DESTINATIONS,
  EmptyListMessages,
  Mode,
  BLANK_POINT,
  SUGGESTED_TIME_OFFSET_IN_HOURS,
  TimeUnit,
  MIN_PRICE_VALUE
};
