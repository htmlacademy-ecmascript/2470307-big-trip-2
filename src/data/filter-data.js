import { FilterType } from '../constants.js';

const FILTERS = [
  {
    id: FilterType.EVERYTHING,
    value: FilterType.EVERYTHING,
    label: 'Everything',
  },
  {
    id: FilterType.FUTURE,
    value: FilterType.FUTURE,
    label: 'Future',
  },
  {
    id: FilterType.PRESENT,
    value: FilterType.PRESENT,
    label: 'Present',
  },
  {
    id: FilterType.PAST,
    value: FilterType.PAST,
    label: 'Past',
  },
];

export { FILTERS };
