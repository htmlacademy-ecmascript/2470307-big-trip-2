import { createElement } from '../render.js';
import SortItemView from './sort-item-view.js';

function createSortTemplate(sortItems, currentSortType) {
  const sortItemsTemplate = sortItems.map((sortItem) => {
    const sortItemComponent = new SortItemView(sortItem, currentSortType);
    return sortItemComponent.getTemplate();
  }).join('');

  return `
    <form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>
  `;
}

export default class SortView {
  constructor(sortItems, currentSortType) {
    this.sortItems = sortItems;
    this.currentSortType = currentSortType;
  }

  getTemplate() {
    return createSortTemplate(this.sortItems, this.currentSortType);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
