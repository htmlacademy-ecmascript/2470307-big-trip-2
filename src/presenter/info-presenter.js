import InfoView from '../view/info-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { INFO } from '../data/info-data.js';

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
   * @param {Object} args - Аргументы конструктора
   * @param {HTMLElement} args.infoContainer - DOM-контейнер
   */
  constructor({ infoContainer }) {
    this.#infoContainer = infoContainer;
  }

  /**
   * @description Инициализирует презентер: рендерит компонент с информацией
   */
  init() {
    const infoView = new InfoView({
      title: INFO.title,
      dates: INFO.dates,
      cost: INFO.cost
    });

    render(
      infoView,
      this.#infoContainer,
      RenderPosition.AFTERBEGIN
    );
  }
}
