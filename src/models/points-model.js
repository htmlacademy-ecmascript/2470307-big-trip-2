import { getRandomPoint } from '../mock/points-mock.js';
import { POINT_COUNT_RENDER } from '../constants.js';

/**
 * @description Модель для работы с точками маршрута. Хранит и обрабатывает данные.
 */
export default class PointsModel {
  /**
   * @description "Сырые" данные о точках
   * @type {Array<Object>}
   */
  #points = [];
  /**
   * @description Экземпляр модели для работы с опциями
   * @type {OffersModel}
   */
  #offersModel = null;
  /**
   * @description Экземпляр модели для работы с пунктами назначения
   * @type {DestinationsModel}
   */
  #destinationsModel = null;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {OffersModel} args.offersModel - Модель опций
   * @param {DestinationsModel} args.destinationsModel - Модель пунктов назначения
   */
  constructor({ offersModel, destinationsModel }) {
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = Array.from({ length: POINT_COUNT_RENDER }, getRandomPoint);
  }

  /**
   * @description Геттер для получения всех доступных опций
   * @returns {Array<Object>}
   */
  get offers() {
    return this.#offersModel.offers;
  }

  /**
   * @description Геттер для получения всех доступных пунктов назначения
   * @returns {Array<Object>}
   */
  get destinations() {
    return this.#destinationsModel.destinations;
  }

  /**
   * @description Геттер для получения точек,
   * адаптированных для клиента.
   * @returns {Array<Object>}
   */
  get points() {
    return this.#points.map((point) => {
      const destination = this.#destinationsModel.getDestinationsById(point.destination);
      const selectedOffers = this.#offersModel.getOffersByIds(point.offers);

      return {
        ...point,
        basePrice: point.base_price,
        dateFrom: point.date_from,
        dateTo: point.date_to,
        isFavorite: point.is_favorite,
        destination,
        offers: selectedOffers,
      };
    });
  }
}
