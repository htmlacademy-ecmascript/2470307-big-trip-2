import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate({ sortType, label, isChecked, isDisabled }) {

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input
        id="sort-${sortType}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="${sortType}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${sortType}">${label}</label>
    </div>`

  );
}

export default class SortItemView extends AbstractView {
  #props = null;

  constructor(props) {
    super();
    this.#props = props;
  }

  get template() {
    return createSortItemTemplate(this.#props);
  }
}
