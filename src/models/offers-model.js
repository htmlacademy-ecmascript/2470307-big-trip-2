import { offers } from '../mock/offers-mock.js';

export default class OffersModel {
  offers = offers;

  getOffers() {
    return this.offers;
  }
}
