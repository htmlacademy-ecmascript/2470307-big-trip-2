import EditPointView from '../view/trip-point-edit-view.js';
import PointView from '../view/trip-point-view.js';
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

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onRollupClick: this.#handleRollupClick,
      onFavoriteClick: this.#handleFavoriteClick,
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

  get isBusy() {
    return this.#editComponent?._state.isDisabled ?? false;
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

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closeEditForm();
    }
  };

  #replacePointToForm() {
    const canChangeMode = this.#handleModeChange();
    if (!canChangeMode) {
      return;
    }

    if (this.#editComponent === null) {
      this.#editComponent = new EditPointView({
        point: this.#point,
        allOffers: this.#allOffers,
        allDestinations: this.#allDestinations,
        onFormSubmit: this.#handleFormSubmit,
        onRollupClick: this.#handleRollupCloseClick,
        onDeleteClick: this.#handleDeleteClick,
      });
    }

    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleRollupClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = async (point) => {
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

  #handleDeleteClick = async (point) => {
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

  #handleRollupCloseClick = () => {
    this.#closeEditForm();
  };

  #closeEditForm = () => {
    this.#editComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = async () => {
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
