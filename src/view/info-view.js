import AbstractView from '../framework/view/abstract-view.js';

/**
 * @description Создает шаблон для основной информации о путешествии
 * @param {string} title - Заголовок (маршрут)
 * @param {string} dates - Даты путешествия
 * @param {number} cost - Общая стоимость
 * @returns {string}
 */
function createInfoTemplate(title, dates, cost) {
  return (`
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${dates}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>
  `);
}

/**
 * @description Класс представления для основной информации о путешествии
 */
export default class InfoView extends AbstractView {
  /**
   * @description Заголовок (маршрут)
   * @type {string|null}
   */
  #title = null;
  /**
   * @description Даты путешествия
   * @type {string|null}
   */
  #dates = null;
  /**
   * @description Общая стоимость
   * @type {number}
   */
  #cost = 0;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {string} args.title - Заголовок
   * @param {string} args.dates - Даты
   * @param {number} args.cost - Стоимость
   */
  constructor({ title, dates, cost }) {
    super();
    this.#title = title;
    this.#dates = dates;
    this.#cost = cost;
  }

  /**
   * @description Геттер для получения шаблона
   * @returns {string}
   */
  get template() {
    return createInfoTemplate(this.#title, this.#dates, this.#cost);
  }
}
