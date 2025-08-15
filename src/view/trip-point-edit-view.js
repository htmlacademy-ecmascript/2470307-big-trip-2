import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createTripPointEditHeaderTemplate } from './trip-point-edit-header-view.js';
import { createTripPointEditDetailsTemplate } from './trip-point-edit-details-view.js';
import { BLANK_POINT } from '../constants.js';

/**
 * @description Создает шаблон для формы редактирования точки
 * @param {Object} point - Точка маршрута
 * @param {Array} allOffers - Все доступные опции
 * @param {Array} allDestinations - Все доступные пункты назначения
 * @param {boolean} isCreating - Флаг, указывающий, создается ли новая точка
 * @returns {string}
 */
function createEditTripPointsTemplate(point, allOffers, allDestinations, isCreating) {
  const allOffersForType = allOffers.find((offer) => offer.type === point.type)?.offers;

  return (`
    <form class="event event--edit" action="#" method="post">
      ${createTripPointEditHeaderTemplate(point, allDestinations, allOffers, isCreating)}
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
  #handleResetClick = null;
  #isCreating = false;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {Object} args.point - Точка маршрута
   * @param {Array} args.allOffers - Все доступные опции
   * @param {Array} args.allDestinations - Все доступные пункты назначения
   * @param {Function} args.onFormSubmit - Колбэк для обработки отправки формы
   * @param {Function} args.onResetClick - Колбэк для обработки клика по кнопке "Delete/Cancel"
   * @param {Function} args.onRollupClick - Колбэк для обработки клика по кнопке "стрелка вверх"
   * @param {boolean} args.isCreating - Флаг, указывающий, создается ли новая точка
   */
  constructor({ point = BLANK_POINT, allOffers, allDestinations, onFormSubmit, onRollupClick, onResetClick, isCreating = false }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#isCreating = isCreating;

    this.#handleRollupClick = onRollupClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleResetClick = onResetClick;

    this._restoreHandlers();
  }

  /**
   * @description Геттер для получения шаблона
   * @returns {string}
   */
  get template() {
    return createEditTripPointsTemplate(this._state, this.#allOffers, this.#allDestinations, this.#isCreating);
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    if (!this.#isCreating) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    }
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetClickHandler);

    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    const offersContainer = this.element.querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this.#offersChangeHandler);
    }

    // Устанавливаем начальное состояние кнопки Save
    this.#toggleSaveButton();
  }

  #toggleSaveButton() {
    // Находим кнопку и устанавливаем ей свойство disabled в зависимости от валидности формы
    this.element.querySelector('.event__save-btn').disabled = this.#isFormInvalid();
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick(EditPointView.parseStateToPoint(this._state));
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
    } else {
      // Если пункта назначения не найдено, сохраняем введенное пользователем значение
      // и сбрасываем описание и фото. Валидация обработает невалидное значение.
      this.updateElement({
        destination: {
          name: evt.target.value,
          description: null,
          pictures: []
        }
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    // Разрешаем ввод только цифр
    evt.target.value = evt.target.value.replace(/\D/g, '');
    const newPrice = parseInt(evt.target.value, 10);
    this._setState({
      basePrice: isNaN(newPrice) ? 0 : newPrice,
    });
    this.#toggleSaveButton();
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOfferIds = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'))
      .map((checkbox) => checkbox.value);

    const allOffersForType = this.#allOffers.find((offer) => offer.type === this._state.type)?.offers || [];
    const selectedOffers = allOffersForType.filter((offer) => checkedOfferIds.includes(offer.id));
    this._setState({ offers: selectedOffers });
  };

  #isFormInvalid() {
    // Проверяем, что пункт назначения выбран из списка (а не просто введен текст)
    const isDestinationInvalid = !this.#allDestinations.some((dest) => dest.name === this._state.destination.name);

    // Проверяем, что цена - это число больше 0
    const isPriceInvalid = !this._state.basePrice || this._state.basePrice <= 0;

    return isDestinationInvalid || isPriceInvalid;
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }
}
