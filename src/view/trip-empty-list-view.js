import AbstractView from '../framework/view/abstract-view.js';

/**
 * @description Создает шаблон для заглушки (пустого списка)
 * @returns {string}
 */
function createTripEmptyListTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

/**
 * @description Класс представления для заглушки (пустого списка)
 */
export default class TripEmptyListView extends AbstractView {
  #message = null;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {string} args.message - Сообщение для пользователя
   */
  constructor({ message }) {
    super();
    this.#message = message;
  }

  get template() {
    return createTripEmptyListTemplate(this.#message);
  }
}
