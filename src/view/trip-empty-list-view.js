import AbstractView from '../framework/view/abstract-view.js';

/**
 * @description Создает шаблон для заглушки (пустого списка)
 * @returns {string}
 */
function createTripEmptyListTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

/**
 * @description Класс представления для заглушки (пустого списка)
 */
export default class TripEmptyListView extends AbstractView {
  get template() {
    return createTripEmptyListTemplate();
  }
}
