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

  getOffersByType(type = '') {
    return this.#offers.find((item) => item.type === type)?.offers || [];
  }

  getOffersByIds(ids = []) {
    return this.#getAllOffers().filter((offer) => ids.includes(offer.id));
  }

  getPointTypes() {
    return this.#offers.map((item) => item.type);
  }

  #getAllOffers() {
    return this.#offers.flatMap((item) => item.offers);
  }
}
