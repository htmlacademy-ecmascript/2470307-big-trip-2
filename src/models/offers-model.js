export default class OffersModel {
  #pointsApiService = null;
  #offers = [];

  constructor({ pointsApiService }) {
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#pointsApiService.offers;
    return this.#offers;
  }

  getOffersByIds(ids = []) {
    return this.#getAllOffers().filter((offer) => ids.includes(offer.id));
  }

  #getAllOffers() {
    return this.#offers.flatMap((item) => item.offers);
  }
}
