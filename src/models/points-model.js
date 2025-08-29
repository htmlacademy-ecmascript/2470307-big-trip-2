import Observable from '../framework/observable.js';
import { UpdateType } from '../constants.js';

export default class PointsModel extends Observable {
  #points = [];
  #pointsApiService = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor({ offersModel, destinationsModel, pointsApiService }) {
    super();
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get points() {
    return this.#points;
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
