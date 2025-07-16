import { createElement } from '../render.js';

function createFilterItemTemplate(filter, isChecked) {
  const { id, value, label } = filter;

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${id}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${value}"
        ${isChecked ? 'checked' : ''}
      >
       <label class="trip-filters__filter-label" for="filter-${id}">${label}</label>
    </div>`
  );
}

export default class FilterItemView {
  constructor(filter, isChecked) {
    this.filter = filter;
    this.isChecked = isChecked;
  }

  getTemplate() {
    return createFilterItemTemplate(this.filter, this.isChecked);
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
