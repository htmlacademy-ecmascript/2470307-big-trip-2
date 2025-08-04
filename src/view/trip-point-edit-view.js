import AbstractView from '../framework/view/abstract-view.js';
import { createTripPointEditHeaderTemplate } from './trip-point-edit-header-view.js';
import { createTripPointEditDetailsTemplate } from './trip-point-edit-details-view.js';

/**
 * @description Создает шаблон для формы редактирования точки
 * @param {Object} point - Точка маршрута
 * @param {Array<Object>} allOffers - Все доступные опции
 * @param {Array<Object>} allDestinations - Все доступные пункты назначения
 * @returns {string}
 */
function createEditTripPointsTemplate(point, allOffers, allDestinations) {
  const allOffersForType = allOffers.find((offer) => offer.type === point.type)?.offers || [];

  return (`
    <form class="event event--edit" action="#" method="post">
      ${createTripPointEditHeaderTemplate(point, allDestinations, allOffers)}
      ${createTripPointEditDetailsTemplate(point, allOffersForType)}
    </form>
  `);
}

/**
 * @description Класс представления для формы редактирования точки
 */
export default class EditPointView extends AbstractView {
  /**
   * @description Точка маршрута
   * @type {Object|null}
   */
  #point = null;
  /**
   * @description Все доступные опции
   * @type {Array<Object>}
   */
  #allOffers = [];
  /**
   * @description Все доступные пункты назначения
   * @type {Array<Object>}
   */
  #allDestinations = [];
  /**
   * @description Колбэк для обработки клика по кнопке "стрелка вверх"
   * @type {Function}
   */
  #handleRollupClick = null;
  /**
   * @description Колбэк для обработки отправки формы
   * @type {Function}
   */
  #handleFormSubmit = null;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {Object} args.point - Точка маршрута
   * @param {Array<Object>} args.allOffers - Все доступные опции
   * @param {Array<Object>} args.allDestinations - Все доступные пункты назначения
   * @param {Function} args.onFormSubmit - Колбэк для обработки отправки формы
   * @param {Function} args.onRollupClick - Колбэк для обработки клика по кнопке "стрелка вверх"
   */
  constructor({ point, allOffers, allDestinations, onFormSubmit, onRollupClick }) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleRollupClick = onRollupClick;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  /**
   * @description Геттер для получения шаблона
   * @returns {string}
   */
  get template() {
    return createEditTripPointsTemplate(this.#point, this.#allOffers, this.#allDestinations);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
