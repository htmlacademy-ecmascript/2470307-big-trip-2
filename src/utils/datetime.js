import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat, MIN_DAYS_FOR_FULL_DURATION_FORMAT, MIN_HOURS_FOR_MEDIUM_DURATION_FORMAT, DURATION_FORMAT_PAD_LENGTH, DURATION_FORMAT_PAD_CHAR } from '../constants.js';

dayjs.extend(duration);

const formatDateTime = (date) => dayjs(date).format(DateFormat.DAY_MONTH_YEAR_HOUR_MINUTE);

const formatDate = (date) => dayjs(date).format(DateFormat.MONTH_DAY);

const formatTime = (date) => dayjs(date).format(DateFormat.HOUR_MINUTE);

const getTimeDifference = (dateFrom, dateTo) => {
  const timeDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

  const formatTwoDigits = (quantity) => String(quantity).padStart(DURATION_FORMAT_PAD_LENGTH, DURATION_FORMAT_PAD_CHAR);

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
