import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mock/points-mock.js';
import { POINT_COUNT_RENDER } from '../constants.js';

/**
 * @description Модель для работы с точками маршрута. Хранит и обрабатывает данные.
 */
export default class PointsModel extends Observable {
  /**
   * @description "Сырые" данные о точках
   * @type {Array}
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
    super();
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = Array.from({ length: POINT_COUNT_RENDER }, getRandomPoint);
  }

  /**
   * @description Геттер для получения всех доступных опций
   * @returns {Array}
   */
  get offers() {
    return this.#offersModel.offers;
  }

  /**
   * @description Геттер для получения всех доступных пунктов назначения
   * @returns {Array}
   */
  get destinations() {
    return this.#destinationsModel.destinations;
  }

  /**
   * @description Геттер для получения точек,
   * адаптированных для клиента.
   * @returns {Array}
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

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      this.#adaptToServer(update),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    const newPoint = { ...this.#adaptToServer(update), id: crypto.randomUUID() };
    this.#points = [
      newPoint,
      ...this.#points,
    ];

    this._notify(updateType, this.points.find((p) => p.id === newPoint.id));
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToServer(point) {
    const adaptedPoint = { ...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : point.dateFrom,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : point.dateTo,
      'is_favorite': point.isFavorite,
      destination: point.destination.id,
      offers: point.offers.map(({id}) => id)
    };

    delete adaptedPoint.basePrice; delete adaptedPoint.dateFrom; delete adaptedPoint.dateTo; delete adaptedPoint.isFavorite;
    return adaptedPoint;
  }
}
