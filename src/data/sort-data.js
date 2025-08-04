import { SortType } from '../constants.js';

/**
 * @description Опции сортировки, которые отображаются пользователю
 * @type {Array<Object>}
 */
export const SORT_OPTIONS = [
  {
    type: SortType.DAY,
    label: 'Day',
    isDefault: true
  },
  {
    type: SortType.EVENT,
    label: 'Event',
  },
  {
    type: SortType.TIME,
    label: 'Time',
  },
  {
    type: SortType.PRICE,
    label: 'Price',
  },
  {
    type: SortType.OFFERS,
    label: 'Offers',
  },
];
