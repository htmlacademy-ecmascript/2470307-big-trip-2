import AbstractView from '../framework/view/abstract-view.js';

/**
 * @description Создает шаблон для одного элемента фильтра
 * @param {Object} filter - Данные фильтра
 * @returns {string}
 */
function createFilterItemTemplate(filter) {
  const { id, value, label, isDisabled, isChecked } = filter;

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${id}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${value}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
       <label class="trip-filters__filter-label" for="filter-${id}">${label}</label>
    </div>`
  );
}

/**
 * @description Класс представления для одного элемента фильтра
 */
export default class FilterItemView extends AbstractView {
  /**
   * @description Данные фильтра
   * @type {Object}
   */
  #filter = null;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {Object} args.filter - Данные фильтра
   */
  constructor({ filter }) {
    super();
    this.#filter = filter;
  }

  /**
   * @description Геттер для получения шаблона
   * @returns {string}
   */
  get template() {
    return createFilterItemTemplate(this.#filter);
  }
}
