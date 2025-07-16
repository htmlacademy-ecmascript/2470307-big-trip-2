import FilterPresenter from './presenter/filter-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

const tripControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');


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

const tripPresenter = new TripPresenter(tripEventsContainer);

tripPresenter.init();
