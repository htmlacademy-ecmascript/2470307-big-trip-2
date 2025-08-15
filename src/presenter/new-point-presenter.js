import EditPointView from '../view/trip-point-edit-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #editComponent = null;

  #allOffers = [];
  #allDestinations = [];

  constructor({ pointListContainer, allOffers, allDestinations, onDataChange, onDestroy }) {
    this.#pointListContainer = pointListContainer;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#editComponent !== null) {
      return;
    }

    this.#editComponent = new EditPointView({
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onFormSubmit: this.#handleFormSubmit,
      onResetClick: this.#handleCancelClick,
      isCreating: true,
    });

    render(this.#editComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editComponent);
    this.#editComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = () => {
    // Пока не реализуем сохранение, просто уничтожаем форму
    // this.#handleDataChange(point);
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };
}
