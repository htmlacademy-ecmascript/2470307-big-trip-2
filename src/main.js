import FilterPresenter from './presenter/filter-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';

const tripControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();


const filterPresenter = new FilterPresenter({
  filtersContainer: tripControlsElement
});

filterPresenter.init();

const sortPresenter = new SortPresenter({
  sortContainer: tripEventsContainer
});

sortPresenter.init();

const infoPresenter = new InfoPresenter({
  infoContainer: tripMain
});

infoPresenter.init();

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsContainer,
  pointsModel,
  offersModel,
  destinationsModel
});

tripPresenter.init();
