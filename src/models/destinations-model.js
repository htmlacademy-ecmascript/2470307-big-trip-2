export default class DestinationsModel {
  #pointsApiService = null;
  #destinations = [];

  constructor({ pointsApiService }) {
    this.#pointsApiService = pointsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    this.#destinations = await this.#pointsApiService.destinations;
    return this.#destinations;
  }

  getDestinationsById(id = '') {
    return this.#destinations.find((destination) => destination.id === id) || {};
  }
}
