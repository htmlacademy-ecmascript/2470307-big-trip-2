/** Максимальное количество городов в шапке */
const TRIP_INFO_MAX_DESTINATIONS = 3;
const SUGGESTED_TIME_OFFSET_IN_HOURS = 1;
const MIN_PRICE_VALUE = 0;
const AUTHORIZATION = 'Basic eg1w190ir41196f';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const MIN_DAYS_FOR_FULL_DURATION_FORMAT = 1;
const MIN_HOURS_FOR_MEDIUM_DURATION_FORMAT = 1;
const DURATION_FORMAT_PAD_LENGTH = 2;
const DURATION_FORMAT_PAD_CHAR = '0';
const INITIAL_COST_VALUE = 0;
const REGEX_ONLY_DIGITS = /\D/g;

/** Форматы дат */
const DateFormat = {
  MONTH_DAY: 'MMM D',
  HEADER_DATE: 'D MMM',
  DAY: 'D',
  HOUR_MINUTE: 'HH:mm',
  DAY_MONTH_YEAR_HOUR_MINUTE: 'DD/MM/YY HH:mm',
  FLATPICKR: 'd/m/y H:i',
  DURATION_HOURS: 'H',
  DURATION_MINUTES: 'M',
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

/** Сообщение при ошибке загрузки данных */
const FAILED_LOAD_MESSAGE = 'Failed to load latest route information';

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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH', // Обновить часть точки
  MINOR: 'MINOR', // Обновить список
  MAJOR: 'MAJOR', // Обновить всю доску
  INIT: 'INIT', // Начальная инициализация
};

const BLANK_POINT = {
  basePrice: INITIAL_COST_VALUE,
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

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const ApiUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  TRIP_INFO_MAX_DESTINATIONS,
  SUGGESTED_TIME_OFFSET_IN_HOURS,
  MIN_PRICE_VALUE,
  AUTHORIZATION,
  END_POINT,
  MIN_DAYS_FOR_FULL_DURATION_FORMAT,
  MIN_HOURS_FOR_MEDIUM_DURATION_FORMAT,
  DURATION_FORMAT_PAD_LENGTH,
  DURATION_FORMAT_PAD_CHAR,
  INITIAL_COST_VALUE,
  REGEX_ONLY_DIGITS,
  DateFormat,
  FilterType,
  EmptyListMessages,
  FAILED_LOAD_MESSAGE,
  SortType,
  Mode,
  UserAction,
  UpdateType,
  BLANK_POINT,
  TimeUnit,
  Method,
  ApiUrl,
  TimeLimit,
};
