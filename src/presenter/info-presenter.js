import InfoView from '../view/info-view.js';
import { render, RenderPosition, remove, replace } from '../framework/render.js';
import { sortPointsByDate, getTripTitle, getTripDates, getTripCost } from '../utils/point.js';

export default class InfoPresenter {
  #infoContainer = null;
  #pointsModel = null;
  #infoComponent = null;

  constructor({ infoContainer, pointsModel }) {
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevInfoComponent = this.#infoComponent;
    const points = this.#pointsModel.points;

    if (points.length === 0) {
      remove(prevInfoComponent);
      this.#infoComponent = null;
      return;
    }

    const sortedPoints = sortPointsByDate(points);
    const title = getTripTitle(sortedPoints);
    const dates = getTripDates(sortedPoints);
    const cost = getTripCost(sortedPoints);

    this.#infoComponent = new InfoView({ title, dates, cost });

    if (prevInfoComponent === null) {
      render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
