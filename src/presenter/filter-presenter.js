import FiltersView from '../view/filters-list-view.js';
import FilterItemView from '../view/filter-item-view.js';
import { FILTERS } from '../data/filter-data.js';
import { render, RenderPosition } from '../framework/render.js';

/**
 * @description Презентер для фильтров
 */
export default class FilterPresenter {
  /**
   * @description DOM-элемент, в который будут рендериться фильтры
   * @type {HTMLElement}
   */
  #filtersContainer = null;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {HTMLElement} args.filtersContainer - DOM-контейнер для фильтров
   */
  constructor({ filtersContainer }) {
    this.#filtersContainer = filtersContainer;
  }

  /**
   * @description Инициализирует презентер: рендерит компонент фильтров
   */
  init() {
    const filters = FILTERS.map((filter, index) => ({
      ...filter,
      isDisabled: false, // Пока все фильтры активны
      isChecked: index === 0, // Первый фильтр выбран по умолчанию
    }));

    const filtersComponent = new FiltersView();
    render(filtersComponent, this.#filtersContainer, RenderPosition.BEFOREEND);

    for (const f of filters) {
      const filterItemComponent = new FilterItemView({ filter: f });
      render(filterItemComponent, filtersComponent.element);
    }
  }
}
