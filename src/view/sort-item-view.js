import AbstractView from '../framework/view/abstract-view.js';

/**
 * @description Создает шаблон для одного элемента сортировки
 * @param {Object} props - Свойства элемента сортировки
 * @returns {string}
 */
function createSortItemTemplate({ sortType, label, isChecked, isDisabled }) {

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input
        id="sort-${sortType}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortType}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${sortType}">${label}</label>
    </div>`

  );
}

/**
 * @description Класс представления для одного элемента сортировки
 */
export default class SortItemView extends AbstractView {
  /**
   * @description Свойства компонента
   * @type {Object}
   */
  #props = null;

  /**
   * @param {Object} props - Свойства компонента
   */
  constructor(props) {
    super();
    this.#props = props;
  }

  /**
   * @description Геттер для получения шаблона
   * @returns {string}
   */
  get template() {
    return createSortItemTemplate(this.#props);
  }
}
