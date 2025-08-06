import InfoView from '../view/info-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { sortPointsByDate, getTripTitle, getTripDates, getTripCost } from '../utils/point.js';

/**
 * @description Презентер для основной информации о путешествии (шапка)
 */
export default class InfoPresenter {
  /**
   * @description DOM-элемент, в который будет рендериться информация
   * @type {HTMLElement}
   */
  #infoContainer = null;
  /**
   * @description Модель точек маршрута
   * @type {PointsModel}
   */
  #pointsModel = null;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {HTMLElement} args.infoContainer - DOM-контейнер
   * @param {PointsModel} args.pointsModel - Модель точек
   */
  constructor({ infoContainer, pointsModel }) {
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;
  }

  /**
   * @description Инициализирует презентер: рендерит компонент с информацией
   */
  init() {
    const points = this.#pointsModel.points;

    if (points.length === 0) {
      return;
    }

    const sortedPoints = sortPointsByDate(points);
    const title = getTripTitle(sortedPoints);
    const dates = getTripDates(sortedPoints);
    const cost = getTripCost(sortedPoints);

    const infoView = new InfoView({ title, dates, cost });

    render(
      infoView,
      this.#infoContainer,
      RenderPosition.AFTERBEGIN
    );
  }
}
