import TripPontsListView from '../view/trip-point-list-view.js';
import EditPointView from '../view/trip-point-edit-view.js';
import PointView from '../view/trip-point-view.js';
import { render } from '../render.js';
import { START_COUNT_POINT_RENDER } from '../constants.js';

export default class TripPresenter {
  constructor({ tripContainer, pointsModel, offersModel, destinationsModel }) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    const rawPoints = this.pointsModel.getPoints();
    const allOffers = this.offersModel.getOffers();
    const allDestinations = this.destinationsModel.getDestinations();

    this.tripPoints = rawPoints.map((point) => {
      const destination = allDestinations.find((dest) => dest.id === point.destination);
      const offersForType = allOffers.find((offer) => offer.type === point.type)?.offers || [];
      const selectedOffers = offersForType.filter((offer) => point.offers.includes(offer.id));

      return {
        ...point,
        basePrice: point.base_price,
        dateFrom: point.date_from,
        dateTo: point.date_to,
        isFavorite: point.is_favorite,
        destination,
        offers: selectedOffers,
      };
    });

    this.tripListView = new TripPontsListView();
    render(this.tripListView, this.tripContainer);
    const listElement = this.tripListView.getElement();

    render(new EditPointView({
      point: this.tripPoints[0],
      allOffers,
      allDestinations
    }), listElement);

    for (let i = START_COUNT_POINT_RENDER; i < this.tripPoints.length; i++) {
      render(new PointView({ point: this.tripPoints[i] }), listElement);
    }
  }
}
