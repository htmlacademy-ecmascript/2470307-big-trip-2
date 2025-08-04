import AbstractView from '../framework/view/abstract-view.js';

/**
 * @description Создает шаблон для контейнера фильтров
 * @returns {string}
 */
function createFiltersTemplate() {
  return (
    `<form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

/**
 * @description Класс представления для контейнера фильтров
 */
export default class FiltersView extends AbstractView {
  /**
   * @description Геттер для получения шаблона
   * @returns {string}
   */
  get template() {
    return createFiltersTemplate();
  }
}
