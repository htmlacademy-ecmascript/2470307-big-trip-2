import TripPontsListView from '../view/trip-point-list-view.js';
import { render, remove } from '../framework/render.js';
import TripEmptyListView from '../view/trip-empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { filterUtils } from '../utils/filter.js';
import { FilterType, EmptyListMessages, SortType } from '../constants.js';
import SortView from '../view/sort-list-view.js';
import { SORT_OPTIONS } from '../data/sort-data.js';
import SortItemView from '../view/sort-item-view.js';
import { sortPointsByDate, sortPointsByPrice, sortPointsByTime } from '../utils/point.js';

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
   * @description Текущий тип сортировки
   * @type {string}
   */
  #currentSortType = SortType.DAY;

  /**
   * @description Компонент сортировки
   * @type {SortView|null}
   */
  #sortComponent = null;
  /**
   * @description Компонент-заглушка
   * @type {TripEmptyListView|null}
   */
  #emptyListComponent = null;

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
    // Сортируем точки по умолчанию (по дате)
    this.#tripPoints = sortPointsByDate(this.#tripPoints);

    this.#renderBoard();
  }

  #handleDataChange = (updatedPoint) => {
    this.#tripPoints = this.#tripPoints.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    switch (sortType) {
      case SortType.PRICE:
        this.#tripPoints = sortPointsByPrice(this.#tripPoints);
        break;
      case SortType.TIME:
        this.#tripPoints = sortPointsByTime(this.#tripPoints);
        break;
      case SortType.DAY:
        this.#tripPoints = sortPointsByDate(this.#tripPoints);
    }

    this.#currentSortType = sortType;
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    const availableSorts = [SortType.DAY, SortType.TIME, SortType.PRICE];

    for (const { type, label } of SORT_OPTIONS) {
      const sortItemComponent = new SortItemView({
        sortType: type,
        label,
        isChecked: type === this.#currentSortType,
        isDisabled: !availableSorts.includes(type)
      });
      render(sortItemComponent, this.#sortComponent.element);
    }

    render(this.#sortComponent, this.#tripContainer);
  }

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
      this.#emptyListComponent = new TripEmptyListView({ message: EmptyListMessages[this.#currentFilterType] });
      render(this.#emptyListComponent, this.#tripContainer);
      return;
    }

    render(this.#tripListView, this.#tripContainer);

    for (const point of points) {
      this.#renderPoint(point);
    }
  }

  /**
   * @description Отрисовывает доску со всеми компонентами
   */
  #renderBoard() {
    this.#clearBoard();
    this.#renderSort();
    this.#renderTrip();
  }

  /**
   * @description Очищает доску (список точек и сортировку)
   */
  #clearBoard() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#tripListView);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
  }
}
