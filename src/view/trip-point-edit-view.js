import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createTripPointEditHeaderTemplate } from './trip-point-edit-header-view.js';
import { createTripPointEditDetailsTemplate } from './trip-point-edit-details-view.js';

/**
 * @description Создает шаблон для формы редактирования точки
 * @param {Object} point - Точка маршрута
 * @param {Array} allOffers - Все доступные опции
 * @param {Array} allDestinations - Все доступные пункты назначения
 * @returns {string}
 */
function createEditTripPointsTemplate(point, allOffers, allDestinations) {
  const allOffersForType = allOffers.find((offer) => offer.type === point.type)?.offers;

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
export default class EditPointView extends AbstractStatefulView {
  #allOffers = [];
  #allDestinations = [];
  #handleRollupClick = null;
  /**
   * @description Колбэк для обработки отправки формы
   * @type {Function}
   */
  #handleFormSubmit = null;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {Object} args.point - Точка маршрута
   * @param {Array} args.allOffers - Все доступные опции
   * @param {Array} args.allDestinations - Все доступные пункты назначения
   * @param {Function} args.onFormSubmit - Колбэк для обработки отправки формы
   * @param {Function} args.onRollupClick - Колбэк для обработки клика по кнопке "стрелка вверх"
   */
  constructor({ point, allOffers, allDestinations, onFormSubmit, onRollupClick }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleRollupClick = onRollupClick;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  /**
   * @description Геттер для получения шаблона
   * @returns {string}
   */
  get template() {
    return createEditTripPointsTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    const offersContainer = this.element.querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this.#offersChangeHandler);
    }
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#allDestinations.find((destination) => destination.name === evt.target.value);

    if (selectedDestination) {
      this.updateElement({
        destination: selectedDestination,
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = parseInt(evt.target.value, 10);
    this._setState({
      basePrice: isNaN(newPrice) ? 0 : newPrice,
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOfferIds = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'))
      .map((checkbox) => checkbox.value);

    const allOffersForType = this.#allOffers.find((offer) => offer.type === this._state.type)?.offers || [];
    const selectedOffers = allOffersForType.filter((offer) => checkedOfferIds.includes(offer.id));
    this._setState({ offers: selectedOffers });
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }
}
