import TripPontsListView from '../view/trip-point-list-view.js';
import EditPointView from '../view/trip-point-edit-view.js';
import PointView from '../view/trip-point-view.js';
import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';

/**
 * @description Главный презентер, управляет отрисовкой списка точек
 */
export default class TripPresenter {
  /**
   * @description DOM-элемент, в который будет рендериться список
   * @type {HTMLElement}
   */
  #tripContainer = null;

  /**
   * @description Модель точек маршрута
   * @type {PointsModel}
   */
  #pointsModel = null;

  /**
   * @description Компонент списка (ul)
   * @type {TripPontsListView}
   */
  #tripListView = new TripPontsListView();

  /**
   * @description Массив точек маршрута
   * @type {Array<Object>}
   */
  #tripPoints = [];

  /**
   * @param {Object} args - Аргументы конструктора
   * @param {HTMLElement} args.tripContainer - DOM-контейнер
   * @param {PointsModel} args.pointsModel - Модель точек
   */
  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  /**
   * @description Инициализация презентера
   */
  init() {
    this.#tripPoints = this.#pointsModel.points;
    this.#renderTrip();
  }

  /**
   * @description Рендерит одну точку маршрута
   * @param {Object} point - Точка маршрута
   */
  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onRollupClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editComponent = new EditPointView({
      point,
      allOffers: this.#pointsModel.offers,
      allDestinations: this.#pointsModel.destinations,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },

      onRollupClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editComponent);
    }

    render(pointComponent, this.#tripListView.element);
  }

  /**
   * @description Рендерит весь список точек
   */
  #renderTrip() {
    render(this.#tripListView, this.#tripContainer);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }
}
