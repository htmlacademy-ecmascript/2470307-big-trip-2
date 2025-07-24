import { createElement } from '../render.js';
import FilterItemView from './filter-item-view.js';

function createFiltersTemplate(filters) {
  const filterItems = filters.map((filter, index) => {
    const filterComponent = new FilterItemView(filter, index === 0);
    return filterComponent.getTemplate();
  }).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView {
  constructor(filters) {
    this.filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this.filters);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
