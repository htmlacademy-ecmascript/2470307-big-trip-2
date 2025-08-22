import FiltersView from '../view/filters-list-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UpdateType } from '../constants.js';
import { filterUtils } from '../utils/filter.js';
import { FILTERS } from '../data/filter-data.js';

/**
 * @description Презентер для фильтров
 */
export default class FilterPresenter {
  /**
   * @description DOM-элемент, в который будут рендериться фильтры
   * @type {HTMLElement}
   */
  #filtersContainer = null;
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

  #filtersComponent = null;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {HTMLElement} args.filtersContainer - DOM-контейнер для фильтров
   * @param {PointsModel} args.pointsModel - Модель точек
   * @param {FilterModel} args.filterModel - Модель фильтров
   */
  constructor({ filtersContainer, pointsModel, filterModel }) {
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return FILTERS.map((filter) => ({
      ...filter,
      isDisabled: filterUtils[filter.id](points).length === 0,
    }));
  }

  /**
   * @description Инициализирует презентер: рендерит компонент фильтров
   */
  init() {
    const filters = this.filters;
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFiltersComponent === null) {
      render(this.#filtersComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
