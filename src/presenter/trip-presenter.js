import TripPointListView from '../view/trip-point-list-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import TripEmptyListView from '../view/trip-empty-list-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { sortPointsByDate, sortPointsByPrice, sortPointsByTime } from '../utils/point.js';
import { filterUtils } from '../utils/filter.js';
import { FilterType, EmptyListMessages, SortType, UpdateType, UserAction, TimeLimit, FAILED_LOAD_MESSAGE } from '../constants.js';
import SortListView from '../view/sort-list-view.js';
import { SORT_OPTIONS } from '../data/sort-data.js';
import SortItemView from '../view/sort-item-view.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class TripPresenter {
  #tripContainer = null;
  #onNewPointDestroy = null;
  #pointsModel = null;
  #filterModel = null;
  #tripListView = new TripPointListView();
  #currentSortType = SortType.DAY;
  #sortComponent = null;
  #emptyListComponent = null;
  #loadingComponent = new LoadingView();
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ tripContainer, pointsModel, filterModel, onNewPointDestroy }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

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

  init() {
    this.#renderBoard();
  }

  createPoint() {
    const canCreate = this.#handleModeChange();
    if (!canCreate) {
      return;
    }

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
      onDestroy: this.#newPointFormCloseHandler,
    });

    this.#newPointPresenter.init();
  }

  #isAnyPresenterBusy() {
    if (this.#newPointPresenter?.isBusy) {
      return true;
    }

    for (const presenter of this.#pointPresenters.values()) {
      if (presenter.isBusy) {
        return true;
      }
    }

    return false;
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFailedLoad() {
    this.#emptyListComponent = new TripEmptyListView({ message: FAILED_LOAD_MESSAGE });
    render(this.#emptyListComponent, this.#tripContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortListView({
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

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderSort();
    this.#renderTrip();
  }

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

  #handleViewAction = async (actionType, updateType, point, options = {}) => {
    const { blockUi = true } = options;

    if (blockUi) {
      this.#uiBlocker.block();
    }

    try {
      switch (actionType) {
        case UserAction.UPDATE_POINT:
          await this.#pointsModel.updatePoint(updateType, point);
          break;
        case UserAction.ADD_POINT:
          await this.#pointsModel.addPoint(updateType, point);
          break;
        case UserAction.DELETE_POINT:
          await this.#pointsModel.deletePoint(updateType, point);
          break;
      }
    } finally {
      if (blockUi) {
        this.#uiBlocker.unblock();
      }
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
        if (data?.isError) {
          this.#renderFailedLoad();
          return;
        }
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    if (this.#isAnyPresenterBusy()) {
      return false;
    }

    this.#newPointPresenter?.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    return true;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #newPointFormCloseHandler = () => {
    this.#onNewPointDestroy();
    if (this.points.length === 0) {
      remove(this.#tripListView);
      this.#renderEmptyList();
    }
  };
}
