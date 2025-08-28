import NewPointView from '../view/new-point-view.js';
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

    this.#editComponent = new NewPointView({
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
    });

    render(this.#editComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  get isBusy() {
    return this.#editComponent?._state.isDisabled ?? false;
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

  #handleFormSubmit = async (point) => {
    this.#editComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
    try {
      await this.#handleViewAction(
        UserAction.ADD_POINT,
        UpdateType.MAJOR,
        point,
      );
    } catch (err) {
      this.#editComponent.shake(() => {
        if (this.#editComponent) {
          this.#editComponent.updateElement({
            isDisabled: false,
            isSaving: false,
          });
        }
      });
    }
  };

  #handleCancelClick = () => {
    this.destroy();
  };
}
