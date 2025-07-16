import { createElement } from '../render.js';
import InfoMainView from './info-main-view.js';
import InfoCostView from './info-cost-view.js';

function createInfoTemplate() {
  return '<section class="trip-main__trip-info trip-info"></section>';
}

export default class InfoView {
  constructor(title, dates, cost) {
    this.title = title;
    this.dates = dates;
    this.cost = cost;
  }

  getTemplate() {
    return createInfoTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());

      const mainView = new InfoMainView(this.title, this.dates);
      const costView = new InfoCostView(this.cost);

      this.element.append(mainView.getElement());
      this.element.append(costView.getElement());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
