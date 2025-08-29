import FilterPresenter from './presenter/filter-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';
import FilterModel from './models/filter-model.js';
import PointsApiService from './points-api-service.js';
import { AUTHORIZATION, END_POINT } from './constants.js';

const tripControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');
const newPointButton = tripMain.querySelector('.trip-main__event-add-btn');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel({ pointsApiService });
const destinationsModel = new DestinationsModel({ pointsApiService });
const filterModel = new FilterModel();
const pointsModel = new PointsModel({ offersModel, destinationsModel, pointsApiService });

const filterPresenter = new FilterPresenter({
  filtersContainer: tripControlsElement,
  pointsModel,
  filterModel
});

const infoPresenter = new InfoPresenter({
  infoContainer: tripMain,
  pointsModel
});

const handleNewPointFormClose = () => {
  newPointButton.disabled = false;
};

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsContainer,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint();
  newPointButton.disabled = true;
};

newPointButton.disabled = true;

tripPresenter.init();

Promise.all([
  offersModel.init(),
  destinationsModel.init(),
]).then(() => {
  filterPresenter.init();
  infoPresenter.init();
  pointsModel.init().then((isSuccess) => {
    if (isSuccess) {
      newPointButton.disabled = false;
    }
  });
}).catch(() => {
  pointsModel.init(true);
});

newPointButton.addEventListener('click', handleNewPointButtonClick);
