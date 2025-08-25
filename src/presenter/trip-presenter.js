import TripPontsListView from '../view/trip-point-list-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import TripEmptyListView from '../view/trip-empty-list-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { sortPointsByDate, sortPointsByPrice, sortPointsByTime } from '../utils/point.js';
import { filterUtils } from '../utils/filter.js';
import { FilterType, EmptyListMessages, SortType, UpdateType, UserAction } from '../constants.js';
import SortView from '../view/sort-list-view.js';
import { SORT_OPTIONS } from '../data/sort-data.js';
import SortItemView from '../view/sort-item-view.js';
import LoadingView from '../view/loading-view.js';

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
   * @description Колбэк, который будет вызван при уничтожении формы создания точки
   * @type {Function|null}
   */
  #onNewPointDestroy = null;

  /**
   * @description Модель точек маршрута
   * @type {PointsModel}
   */
  #pointsModel = null;
  /**
   * @description Модель фильтров
   * @type {FilterModel}
   */
  #filterModel = null;

  /**
   * @description Компонент списка (ul)
   * @type {TripPontsListView}
   */
  #tripListView = new TripPontsListView();

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
   * @description Компонент загрузки
   * @type {LoadingView}
   */
  #loadingComponent = new LoadingView();

  /**
   * @description Коллекция дочерних презентеров
   * @type {Map<string, PointPresenter>}
   */
  #pointPresenters = new Map();
  /**
   * @description Презентер для создания новой точки
   * @type {NewPointPresenter|null}
   */
  #newPointPresenter = null;

  /**
   * @description Флаг, указывающий на состояние загрузки
   * @type {boolean}
   */
  #isLoading = true;

  /**
   * @description Геттер для получения отфильтрованных точек
   * @returns {Array}
   */
  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterUtils[filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return sortPointsByPrice(filteredPoints);
      case SortType.TIME:
        return sortPointsByTime(filteredPoints);
    }

    return sortPointsByDate(filteredPoints);
  }

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {HTMLElement} args.tripContainer - DOM-контейнер
   * @param {PointsModel} args.pointsModel - Модель точек
   * @param {FilterModel} args.filterModel - Модель фильтров
   * @param {Function} args.onNewPointDestroy - Колбэк для обработки закрытия формы новой точки
   */
  constructor({ tripContainer, pointsModel, filterModel, onNewPointDestroy }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }


  /**
   * @description Инициализация презентера
   */
  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#handleModeChange();
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
      this.#renderSort();
      this.#emptyListComponent = null;
      render(this.#tripListView, this.#tripContainer);
    }

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripListView.element,
      allOffers: this.#pointsModel.offers,
      allDestinations: this.#pointsModel.destinations,
      onViewAction: this.#handleViewAction,
      onDestroy: this.#handleNewPointFormClose,
    });

    this.#newPointPresenter.init();
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        await this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter?.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleNewPointFormClose = () => {
    this.#onNewPointDestroy();
    if (this.points.length === 0) {
      remove(this.#tripListView);
      this.#renderEmptyList();
    }
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

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
      onViewAction: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderEmptyList() {
    this.#emptyListComponent = new TripEmptyListView({ message: EmptyListMessages[this.#filterModel.filter] });
    render(this.#emptyListComponent, this.#tripContainer);
  }

  /**
   * @description Рендерит весь список точек
   */
  #renderTrip() {
    const points = this.points;
    if (points.length === 0) {
      this.#renderEmptyList();
      remove(this.#sortComponent);
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
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderSort();
    this.#renderTrip();
  }

  /**
   * @description Очищает доску (список точек и сортировку)
   */
  #clearBoard({ resetSortType = false } = {}) {
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    this.#newPointPresenter?.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    this.#sortComponent = null;

    remove(this.#tripListView);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
      this.#emptyListComponent = null;
    }
  }
}
