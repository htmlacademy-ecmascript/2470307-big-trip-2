import TripPontsListView from '../view/trip-point-list-view.js';
import { render } from '../framework/render.js';
import TripEmptyListView from '../view/trip-empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { filterUtils } from '../utils/filter.js';
import { FilterType, EmptyListMessages } from '../constants.js';

/**
 * @description Главный презентер, управляет отрисовкой списка точек
 */
export default class TripPresenter {
  /**
   * @description DOM-элемент, в который будет рендериться список
   * @type {HTMLElement}
   */
  #tripContainer = null;

  /**
   * @description Модель точек маршрута
   * @type {PointsModel}
   */
  #pointsModel = null;

  /**
   * @description Компонент списка (ul)
   * @type {TripPontsListView}
   */
  #tripListView = new TripPontsListView();

  /**
   * @description Текущий тип фильтра
   * @type {string}
   */
  #currentFilterType = FilterType.EVERYTHING;
  /**
   * @description Массив точек маршрута
   * @type {Array}
   */
  #tripPoints = [];

  /**
   * @description Коллекция дочерних презентеров
   * @type {Map<string, PointPresenter>}
   */
  #pointPresenters = new Map();

  /**
   * @description Геттер для получения отфильтрованных точек
   * @returns {Array}
   */
  get points() {
    return filterUtils[this.#currentFilterType](this.#tripPoints);
  }

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {HTMLElement} args.tripContainer - DOM-контейнер
   * @param {PointsModel} args.pointsModel - Модель точек
   */
  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  /**
   * @description Инициализация презентера
   */
  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#clearTripList();
    this.#renderTrip();
  }

  #handleDataChange = (updatedPoint) => {
    this.#tripPoints = this.#tripPoints.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * @description Рендерит одну точку маршрута
   * @param {Object} point - Точка маршрута
   */
  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripListView.element,
      allOffers: this.#pointsModel.offers,
      allDestinations: this.#pointsModel.destinations,
      onDataChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  /**
   * @description Рендерит весь список точек
   */
  #renderTrip() {
    const points = this.points;
    if (points.length === 0) {
      const message = EmptyListMessages[this.#currentFilterType];
      render(new TripEmptyListView({ message }), this.#tripContainer);
      return;
    }

    render(this.#tripListView, this.#tripContainer);

    for (const point of points) {
      this.#renderPoint(point);
    }
  }

  #clearTripList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
