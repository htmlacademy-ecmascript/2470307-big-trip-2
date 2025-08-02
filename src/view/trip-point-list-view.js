import AbstractView from '../framework/view/abstract-view.js';

/**
 * @description Создает шаблон для контейнера списка точек (ul)
 * @returns {string}
 */
function createTripListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

/**
 * @description Класс представления для контейнера списка точек
 */
export default class TripPontsListView extends AbstractView {
  /**
   * @description Геттер для получения шаблона
   * @returns {string}
   */
  get template() {
    return createTripListTemplate();
  }
}
