import { destinations } from '../mock/destinations-mock.js';

/**
 * @description Модель для работы с пунктами назначения
 */
export default class DestinationsModel {
  /**
   * @description Пункты назначения
   * @type {Array<Object>}
   */
  #destinations = destinations;

  /**
   * @description Геттер для получения всех пунктов назначения
   * @returns {Array<Object>}
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
