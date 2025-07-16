import { createElement } from '../render.js';

function createSortItemTemplate(sortItem, currentSortType) {
  const { type, id, value, label, isDisabled } = sortItem;
  const isChecked = currentSortType === value;

  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${id}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${value}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${id}">${label}</label>
    </div>`

  );
}

export default class SortItemView {
  constructor(sortItem, currentSortType) {
    this.sortItem = sortItem ;
    this.currentSortType = currentSortType;

  }

  getTemplate() {
    return createSortItemTemplate(this.sortItem, this.currentSortType);
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
