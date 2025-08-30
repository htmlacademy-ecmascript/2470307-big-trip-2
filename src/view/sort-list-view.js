import AbstractView from '../framework/view/abstract-view.js';

function createSortTemplate() {
  return `
    <form class="trip-events__trip-sort trip-sort" action="#" method="get">
    </form>
  `;
}

export default class SortListView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.value);
  };
}
