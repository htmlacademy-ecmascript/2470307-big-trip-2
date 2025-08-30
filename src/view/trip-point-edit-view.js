import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createTripPointEditHeaderTemplate } from './trip-point-edit-header-view.js';
import { createTripPointEditDetailsTemplate } from './trip-point-edit-details-view.js';
import { DateFormat, SUGGESTED_TIME_OFFSET_IN_HOURS, TimeUnit, MIN_PRICE_VALUE, REGEX_ONLY_DIGITS } from '../constants.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEditTripPointsTemplate(point, allOffers, allDestinations) {
  const allOffersForType = allOffers.find((offer) => offer.type === point.type)?.offers;

  return (`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post" autocomplete="off">
        ${createTripPointEditHeaderTemplate(point, allDestinations, allOffers, false)}
        ${createTripPointEditDetailsTemplate(point, allOffersForType)}
      </form>
    </li>
  `);
}

export default class TripPointEditView extends AbstractStatefulView {
  #allOffers = [];
  #allDestinations = [];
  #handleRollupClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point, allOffers, allDestinations, onFormSubmit, onRollupClick, onDeleteClick }) {
    super();
    this._setState(TripPointEditView.parsePointToState(point));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;

    this.#handleRollupClick = onRollupClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditTripPointsTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);

    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    const offersContainer = this.element.querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this.#offersChangeHandler);
    }

    this.#toggleSaveButton();
    this.#setDatepickers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  get isBusy() {
    return this._state.isDisabled;
  }

  reset(point) {
    this.updateElement(
      TripPointEditView.parsePointToState(point),
    );
  }

  #toggleSaveButton() {
    if (this._state.isDisabled) {
      return;
    }
    this.element.querySelector('.event__save-btn').disabled = this.#isFormInvalid();
  }

  #setDatepickers() {
    this.#initDatepickerFrom();
    this.#initDatepickerTo();
  }

  #initDatepickerFrom() {
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
    }

    const dateFromInput = this.element.querySelector('#event-start-time-1');
    const dateFromConfig = {
      enableTime: true,
      'time_24hr': true,
      dateFormat: DateFormat.FLATPICKR,
      defaultDate: this._state.dateFrom,
      onChange: this.#dateFromChangeHandler,
      maxDate: this._state.dateTo,
    };

    if (this._state.dateTo && !this._state.dateFrom) {
      const suggestedDate = dayjs(this._state.dateTo).subtract(SUGGESTED_TIME_OFFSET_IN_HOURS, TimeUnit.HOUR);
      dateFromConfig.defaultHour = suggestedDate.hour();
      dateFromConfig.defaultMinute = suggestedDate.minute();
    }

    this.#datepickerFrom = flatpickr(dateFromInput, dateFromConfig);
  }

  #initDatepickerTo() {
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
    }

    const dateToInput = this.element.querySelector('#event-end-time-1');
    const dateToConfig = {
      enableTime: true,
      'time_24hr': true,
      dateFormat: DateFormat.FLATPICKR,
      defaultDate: this._state.dateTo,
      onChange: this.#dateToChangeHandler,
      minDate: this._state.dateFrom,
    };

    if (this._state.dateFrom && !this._state.dateTo) {
      const suggestedDate = dayjs(this._state.dateFrom).add(SUGGESTED_TIME_OFFSET_IN_HOURS, TimeUnit.HOUR);
      dateToConfig.defaultHour = suggestedDate.hour();
      dateToConfig.defaultMinute = suggestedDate.minute();
    }

    this.#datepickerTo = flatpickr(dateToInput, dateToConfig);
  }

  #isFormInvalid() {
    const isDestinationInvalid = !this.#allDestinations.some((dest) => dest.name === this._state.destination.name);

    const isPriceInvalid = !this._state.basePrice || this._state.basePrice <= MIN_PRICE_VALUE;

    const areDatesInvalid = !this._state.dateFrom || !this._state.dateTo;

    return isDestinationInvalid || isPriceInvalid || areDatesInvalid;
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(TripPointEditView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(TripPointEditView.parseStateToPoint(this._state));
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
    evt.target.value = evt.target.value.replace(REGEX_ONLY_DIGITS, '');
    const newPrice = parseInt(evt.target.value, 10);
    this._setState({
      basePrice: isNaN(newPrice) ? MIN_PRICE_VALUE : newPrice,
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

  #dateFromChangeHandler = (dates) => {
    this._setState({ dateFrom: dates[0] || null });
    this.#initDatepickerTo();
    this.#toggleSaveButton();
  };

  #dateToChangeHandler = (dates) => {
    this._setState({ dateTo: dates[0] || null });
    this.#initDatepickerFrom();
    this.#toggleSaveButton();
  };

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}
