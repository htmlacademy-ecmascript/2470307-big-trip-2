import EditPointView from '../view/trip-point-edit-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { UserAction, UpdateType } from '../constants.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleViewAction = null;
  #handleDestroy = null;

  #editComponent = null;

  #allOffers = [];
  #allDestinations = [];

  constructor({ pointListContainer, allOffers, allDestinations, onViewAction, onDestroy }) {
    this.#pointListContainer = pointListContainer;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleViewAction = onViewAction;
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

  #handleFormSubmit = (point) => {
    this.#handleViewAction(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  };

  #handleCancelClick = () => {
    this.destroy();
  };
}
