import FiltersView from '../view/filters-list-view.js';
import { FILTERS } from '../data/filter-data.js';
import { render, RenderPosition } from '../render.js';

export default class FilterPresenter {
  constructor({ filtersContainer }) {
    this.filtersContainer = filtersContainer;
  }

  init() {
    this.filtersComponent = new FiltersView(FILTERS);
    render(
      this.filtersComponent,
      this.filtersContainer,
      RenderPosition.BEFOREEND
    );
  }
}
