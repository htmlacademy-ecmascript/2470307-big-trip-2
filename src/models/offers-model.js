import { offers } from '../mock/offers-mock.js';

/**
 * @description Модель для работы с дополнительными опциями
 */
export default class OffersModel {
  /**
   * @description Дополнительные опции
   * @type {Array<Object>}
   */
  #offers = offers;

  /**
   * @description Геттер для получения всех опций
   * @returns {Array<Object>}
   */
  get offers() {
    return this.#offers;
  }

  /**
   * @description Приватный метод для получения плоского списка всех опций
   * @returns {Array<Object>}
   */
  #getAllOffers() {
    return this.#offers.flatMap((item) => item.offers);
  }

  /**
   * @description Метод для получения опций по типу точки
   * @param {string} type - Тип точки
   * @returns {Array<Object>}
   */
  getOffersByType(type = '') {
    return this.#offers.find((item) => item.type === type)?.offers || [];
  }

  /**
   * @description Метод для получения опций по их ID
   * @param {Array<string>} ids - Массив ID опций
   * @returns {Array<Object>}
   */
  getOffersByIds(ids = []) {
    return this.#getAllOffers().filter((offer) => ids.includes(offer.id));
  }

  /**
   * @description Метод для получения всех доступных типов точек
   * @returns {Array<string>}
   */
  getPointTypes() {
    return this.#offers.map((item) => item.type);
  }
}
