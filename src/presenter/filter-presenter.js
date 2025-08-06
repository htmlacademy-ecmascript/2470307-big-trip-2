import FiltersView from '../view/filters-list-view.js';
import FilterItemView from '../view/filter-item-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { FilterType } from '../constants.js';
import { filterUtils } from '../utils/filter.js';

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
   * @description Модель точек маршрута
   * @type {PointsModel}
   */
  #pointsModel = null;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {HTMLElement} args.filtersContainer - DOM-контейнер для фильтров
   * @param {PointsModel} args.pointsModel - Модель точек
   */
  constructor({ filtersContainer, pointsModel }) {
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
  }

  /**
   * @description Инициализирует презентер: рендерит компонент фильтров
   */
  init() {
    const points = this.#pointsModel.points;
    const filters = Object.values(FilterType).map((type) => ({
      id: type,
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      // Для каждого типа фильтра вызываем соответствующую функцию-фильтратор
      // и проверяем, есть ли в результате точки.
      isDisabled: filterUtils[type](points).length === 0,
      isChecked: type === FilterType.EVERYTHING,
    }));

    const filtersComponent = new FiltersView();
    render(filtersComponent, this.#filtersContainer, RenderPosition.BEFOREEND);

    for (const f of filters) {
      const filterItemComponent = new FilterItemView({ filter: f });
      render(filterItemComponent, filtersComponent.element);
    }
  }
}
