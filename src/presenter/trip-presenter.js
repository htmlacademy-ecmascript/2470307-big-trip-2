import TripListView from '../view/trip-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/trip-point-view.js';
import { render } from '../render.js';

const TRIP_COUNT_RENDER = 3;

export default class TripPresenter {
  constructor(tripContainer) {
    this.tripContainer = tripContainer;
  }

  init() {
    this.tripListView = new TripListView();
    render(this.tripListView, this.tripContainer);
    const listElement = this.tripListView.getElement();

    render(new EditPointView(), listElement);

    for (let i = 0; i < TRIP_COUNT_RENDER; i++) {
      render(new PointView(), listElement);
    }
  }
}
