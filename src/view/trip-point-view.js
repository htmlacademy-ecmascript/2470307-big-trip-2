import AbstractView from '../framework/view/abstract-view.js';
import { formatDate } from '../utils/datetime.js';
import { createTripPointEventTemplate } from './trip-point-event-view.js';
import { createTripSelectedOfferPointTemplate } from './trip-selected-offer-point-view.js';

function createTripPointItemTemplate(point) {
  const { dateFrom, isFavorite, offers } = point;
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return `
  <li class="trip-events__item">
    <div class="event">

      <time class="event__date" datetime="${dateFrom}">${formatDate(dateFrom)}</time>
      ${createTripPointEventTemplate(point)}

      <h4 class="visually-hidden">Offers:</h4>
      ${createTripSelectedOfferPointTemplate(offers)}

      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>

    </div>
  </li>
  `;
}

export default class PointView extends AbstractView {
  #point = null;
  #handleRollupClick = null;
  #handleFavoriteClick = null;

  constructor({ point, onRollupClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#handleRollupClick = onRollupClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripPointItemTemplate(this.#point);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
