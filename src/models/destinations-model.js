/**
 * @description Модель для работы с пунктами назначения
 */
export default class DestinationsModel {
  #pointsApiService = null;
  /**
   * @description Пункты назначения
   * @type {Array}
   */
  #destinations = [];

  constructor({ pointsApiService }) {
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    this.#destinations = await this.#pointsApiService.destinations;
    return this.#destinations;
  }

  /**
   * @description Геттер для получения всех пунктов назначения
   * @returns {Array}
   */
  get destinations() {
    return this.#destinations;
  }

  /**
   * @description Метод для получения пункта назначения по ID
   * @param {string} id - ID пункта назначения
   * @returns {Object|undefined}
   */
  getDestinationsById(id = '') {
    return this.#destinations.find((destination) => destination.id === id) || {};
  }
}
