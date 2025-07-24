import { createElement } from '../render.js';
import { createTripPointEditHeaderTemplate } from './trip-point-edit-header-view.js';
import { createTripPointEditDetailsTemplate } from './trip-point-edit-details-view.js';

function createEditTripPointsTemplate(point, allOffers, allDestinations) {
  const allOffersForType = allOffers.find((offer) => offer.type === point.type)?.offers || [];

  return (`
    <form class="event event--edit" action="#" method="post">
      ${createTripPointEditHeaderTemplate(point, allDestinations, allOffers)}
      ${createTripPointEditDetailsTemplate(point, allOffersForType)}
    </form>
  `);
}

export default class EditPointView {
  constructor({ point, allOffers, allDestinations }) {
    this.point = point;
    this.allOffers = allOffers;
    this.allDestinations = allDestinations;
    this.element = null;
  }

  getTemplate() {
    return createEditTripPointsTemplate(this.point, this.allOffers, this.allDestinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
