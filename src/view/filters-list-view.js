import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate({ id, label, isDisabled }, currentFilterType) {
  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${id}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${id}"
        ${id === currentFilterType ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
       <label class="trip-filters__filter-label" for="filter-${id}">${label}</label>
    </div>`
  );
}

function createFiltersTemplate(filters, currentFilterType) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('')}
    </form>`
  );
}

export default class FiltersListView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleFilterTypeChange(evt.target.value);
  };
}
