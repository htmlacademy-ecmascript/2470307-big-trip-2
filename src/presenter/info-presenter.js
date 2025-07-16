import InfoView from '../view/info-view.js';
import { INFO } from '../data/info-data.js';
import { render, RenderPosition } from '../render.js';

export default class InfoPresenter {
  constructor({ infoContainer }) {
    this.infoContainer = infoContainer;
  }

  init() {
    this.infoView = new InfoView(
      INFO.title,
      INFO.dates,
      INFO.cost
    );

    render(
      this.infoView,
      this.infoContainer,
      RenderPosition.AFTERBEGIN
    );
  }
}
