import TripPointEditView from '../view/trip-point-edit-view.js';
import TripPointView from '../view/trip-point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { Mode, UserAction, UpdateType } from '../constants.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleViewAction = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  #pointComponent = null;
  #editComponent = null;

  #point = null;
  #allOffers = [];
  #allDestinations = [];

  constructor({ pointListContainer, allOffers, allDestinations, onViewAction, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleViewAction = onViewAction;
    this.#handleModeChange = onModeChange;
  }

  get isBusy() {
    return this.#editComponent?.isBusy ?? false;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      onRollupClick: this.#rollupButtonClickHandler,
      onFavoriteClick: this.#favoriteButtonClickHandler,
    });

    if (prevPointComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    remove(prevPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeEditForm();
    }
  }

  #replacePointToForm() {
    const canChangeMode = this.#handleModeChange();
    if (!canChangeMode) {
      return;
    }

    if (this.#editComponent === null) {
      this.#editComponent = new TripPointEditView({
        point: this.#point,
        allOffers: this.#allOffers,
        allDestinations: this.#allDestinations,
        onFormSubmit: this.#formSubmitHandler,
        onRollupClick: this.#rollupCloseButtonClickHandler,
        onDeleteClick: this.#deleteButtonClickHandler,
      });
    }

    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#documentKeyDownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#documentKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #closeEditForm = () => {
    this.#editComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #documentKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closeEditForm();
    }
  };

  #rollupButtonClickHandler = () => {
    this.#replacePointToForm();
  };

  #formSubmitHandler = async (point) => {
    this.#editComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
    try {
      await this.#handleViewAction(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        point
      );
    } catch (err) {
      this.#editComponent.shake(() => {
        if (this.#editComponent.element.parentElement) {
          this.#editComponent.updateElement({
            isDisabled: false,
            isSaving: false,
          });
        }
      });
    }
  };

  #deleteButtonClickHandler = async (point) => {
    this.#editComponent.updateElement({ isDisabled: true, isDeleting: true });
    try {
      await this.#handleViewAction(UserAction.DELETE_POINT, UpdateType.MAJOR, point);
    } catch (err) {
      this.#editComponent.shake(() => {
        if (this.#editComponent.element.parentElement) {
          this.#editComponent.updateElement({
            isDisabled: false,
            isDeleting: false,
          });
        }
      });
    }
  };

  #rollupCloseButtonClickHandler = () => {
    this.#closeEditForm();
  };

  #favoriteButtonClickHandler = async () => {
    try {
      await this.#handleViewAction(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        { ...this.#point, isFavorite: !this.#point.isFavorite },
        { blockUi: false }
      );
    } catch (err) {
      this.#pointComponent.shake();
    }
  };
}
