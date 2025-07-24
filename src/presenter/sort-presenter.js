import SortView from '../view/sort-list-view.js';
import { SORT_OPTIONS } from '../data/sort-data.js';
import { render, RenderPosition } from '../render.js';

export default class SortPresenter {
  constructor({ sortContainer }) {
    this.sortContainer = sortContainer;
    const defaultSort = SORT_OPTIONS.find((item) => item.isDefault);
    this.currentSortType = defaultSort ? defaultSort.value : SORT_OPTIONS[0].value;
  }

  init() {
    this.sortComponent = new SortView(SORT_OPTIONS, this.currentSortType);
    render(
      this.sortComponent,
      this.sortContainer,
      RenderPosition.AFTERBEGIN
    );
  }
}
