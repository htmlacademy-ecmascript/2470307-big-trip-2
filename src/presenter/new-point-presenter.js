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

  get isBusy() {
    return this.#editComponent?.isBusy ?? false;
  }

  init() {
    if (this.#editComponent !== null) {
      return;
    }

    this.#editComponent = new NewPointView({
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onFormSubmit: this.#formSubmitHandler,
      onCancelClick: this.#cancelButtonClickHandler,
    });

    render(this.#editComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#documentKeyDownHandler);
  }

  destroy() {
    if (this.#editComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editComponent);
    this.#editComponent = null;
    document.removeEventListener('keydown', this.#documentKeyDownHandler);
  }

  #documentKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #formSubmitHandler = async (point) => {
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

  #cancelButtonClickHandler = () => {
    this.destroy();
  };
}
