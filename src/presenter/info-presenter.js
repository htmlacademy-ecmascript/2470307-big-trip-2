import InfoView from '../view/info-view.js';
import { render, RenderPosition, remove, replace } from '../framework/render.js';
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
   * @description Компонент с информацией о путешествии
   * @type {InfoView|null}
   */
  #infoComponent = null;

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {HTMLElement} args.infoContainer - DOM-контейнер
   * @param {PointsModel} args.pointsModel - Модель точек
   */
  constructor({ infoContainer, pointsModel }) {
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  /**
   * @description Инициализирует презентер: рендерит компонент с информацией
   */
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
