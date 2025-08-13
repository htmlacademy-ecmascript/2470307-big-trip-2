import AbstractView from '../framework/view/abstract-view.js';

/**
 * @description Создает шаблон для контейнера сортировки
 * @returns {string}
 */
function createSortTemplate() {
  return `
    <form class="trip-events__trip-sort trip-sort" action="#" method="get">
    </form>
  `;
}

/**
 * @description Класс представления для контейнера сортировки
 */
export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  /**
   * @description Геттер для получения шаблона
   * @returns {string}
   */
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
