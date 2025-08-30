import FiltersListView from '../view/filters-list-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UpdateType } from '../constants.js';
import { filterUtils } from '../utils/filter.js';
import { FILTERS } from '../data/filter-data.js';

export default class FilterPresenter {
  #filtersContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #filtersComponent = null;

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

  init() {
    const filters = this.filters;
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersListView({
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
