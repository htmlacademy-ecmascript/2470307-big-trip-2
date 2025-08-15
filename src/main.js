import FilterPresenter from './presenter/filter-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';

/** @type {HTMLElement} Контейнер для фильтров */
const tripControlsElement = document.querySelector('.trip-controls__filters');
/** @type {HTMLElement} Контейнер для событий */
const tripEventsContainer = document.querySelector('.trip-events');
/** @type {HTMLElement} Контейнер для основной информации о путешествии */
const tripMain = document.querySelector('.trip-main');
/** @type {HTMLButtonElement} Кнопка создания новой точки */
const newPointButton = tripMain.querySelector('.trip-main__event-add-btn');

// Создание моделей
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel({ offersModel, destinationsModel });

// Создание и инициализация презентера для фильтров
const filterPresenter = new FilterPresenter({
  filtersContainer: tripControlsElement,
  pointsModel
});

filterPresenter.init();

// Создание и инициализация презентера для основной информации
const infoPresenter = new InfoPresenter({
  infoContainer: tripMain,
  pointsModel
});

infoPresenter.init();

const handleNewPointFormClose = () => {
  newPointButton.disabled = false;
};

// Создание и инициализация основного презентера путешествия
const tripPresenter = new TripPresenter({
  tripContainer: tripEventsContainer,
  pointsModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint();
  newPointButton.disabled = true;
};

newPointButton.addEventListener('click', handleNewPointButtonClick);

tripPresenter.init();
