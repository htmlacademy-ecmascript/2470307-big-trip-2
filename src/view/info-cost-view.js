import { createElement } from '../render.js';

function createInfoCostTemplate(cost) {
  return (`
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    `);
}

export default class InfoCostView {
  constructor(cost) {
    this.cost = cost;
  }

  getTemplate() {
    return createInfoCostTemplate(this.cost);
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
