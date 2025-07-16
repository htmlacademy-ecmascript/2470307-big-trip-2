import { createElement } from '../render.js';

function createInfoManeTemplate(title, dates) {
  return (`
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${dates}</p>
      </div>
    `);
}

export default class InfoMainView {
  constructor(title, dates) {
    this.title = title;
    this.dates = dates;
  }

  getTemplate() {
    return createInfoManeTemplate(this.title, this.dates);
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
