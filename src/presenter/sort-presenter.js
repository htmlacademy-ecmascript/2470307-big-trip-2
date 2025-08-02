import SortView from '../view/sort-list-view.js';
import SortItemView from '../view/sort-item-view.js';
import { SORT_OPTIONS } from '../data/sort-data.js';
import { render, RenderPosition } from '../framework/render.js';
import { SortType } from '../constants.js';

/**
 * @description Презентер для сортировки
 */
export default class SortPresenter {
  /**
   * @description DOM-элемент, в который будет рендериться сортировка
   * @type {HTMLElement}
   */
  #sortContainer = null;

  /**
   * @description Компонент сортировки
   * @type {SortView}
   */
  #sortComponent = new SortView();

  /**
   * @description Текущий тип сортировки
   * @type {string}
   */
  #currentSortType = SortType.DAY;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {HTMLElement} args.sortContainer - DOM-контейнер
   */
  constructor({ sortContainer }) {
    this.#sortContainer = sortContainer;
    const defaultSort = SORT_OPTIONS.find((item) => item.isDefault);
    this.#currentSortType = defaultSort?.type || SORT_OPTIONS[0].type;
  }

  /**
   * @description Инициализирует презентер: рендерит компонент сортировки
   */
  init() {
    const availableSorts = [SortType.DAY, SortType.TIME, SortType.PRICE];

    render(this.#sortComponent, this.#sortContainer, RenderPosition.AFTERBEGIN);

    for (const { type, label } of SORT_OPTIONS) {
      const sortItemComponent = new SortItemView({
        sortType: type,
        label,
        isChecked: type === this.#currentSortType,
        isDisabled: !availableSorts.includes(type)
      });
      render(sortItemComponent, this.#sortComponent.element);
    }
  }
}
