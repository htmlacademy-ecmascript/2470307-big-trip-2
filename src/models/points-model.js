import Observable from '../framework/observable.js';
import { UpdateType } from '../constants.js';

/**
 * @description Модель для работы с точками маршрута. Хранит и обрабатывает данные.
 */
export default class PointsModel extends Observable {
  /**
   * @description "Сырые" данные о точках
   * @type {Array}
   */
  #points = [];
  #pointsApiService = null;
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
  constructor({ offersModel, destinationsModel, pointsApiService }) {
    super();
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsApiService = pointsApiService;
  }

  async init(isError = false) {
    if (isError) {
      this.#points = [];
      this._notify(UpdateType.INIT, { isError: true });
      return false;
    }

    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map((point) => this.#adaptToClient(point));
      this._notify(UpdateType.INIT, { isError: false });
      return true;
    } catch(err) {
      this.#points = [];
      this._notify(UpdateType.INIT, { isError: true });
      return false;
    }
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
    return this.#points;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
      destination: this.#destinationsModel.getDestinationsById(point.destination),
      offers: this.#offersModel.getOffersByIds(point.offers),
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
