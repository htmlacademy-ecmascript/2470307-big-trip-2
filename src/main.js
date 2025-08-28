import FilterPresenter from './presenter/filter-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';
import FilterModel from './models/filter-model.js';
import PointsApiService from './points-api-service.js';
import { AUTHORIZATION, END_POINT } from './constants.js';

/** @type {HTMLElement} Контейнер для фильтров */
const tripControlsElement = document.querySelector('.trip-controls__filters');
/** @type {HTMLElement} Контейнер для событий */
const tripEventsContainer = document.querySelector('.trip-events');
/** @type {HTMLElement} Контейнер для основной информации о путешествии */
const tripMain = document.querySelector('.trip-main');
/** @type {HTMLButtonElement} Кнопка создания новой точки */
const newPointButton = tripMain.querySelector('.trip-main__event-add-btn');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

// Создание моделей
const offersModel = new OffersModel({ pointsApiService });
const destinationsModel = new DestinationsModel({ pointsApiService });
const filterModel = new FilterModel();
const pointsModel = new PointsModel({ offersModel, destinationsModel, pointsApiService });

// Создание и инициализация презентера для фильтров
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

// Создание и инициализация основного презентера путешествия
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

tripPresenter.init(); // Сначала запускаем главный презентер, он покажет "Loading..."

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
