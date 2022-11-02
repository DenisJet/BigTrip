import { createMenuTemplate } from './view/menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createTripCostTemplate } from './view/trip-cost';
import { createFiltersTemplate } from './view/filters';
import { createSortTemplate } from './view/sort';
import { createNewPointTemplate } from './view/new-point';
import { createEditPointTemplate } from './view/edit-point';
import { createEventsListTemplate } from './view/events-list';
import { createPointTemplate } from './view/point';

const POINT_COUNT = 3;
const body = document.querySelector('.page-body');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = body.querySelector('.trip-main');
render(tripMain, createTripInfoTemplate(), 'afterbegin');

const tripInfo = tripMain.querySelector('.trip-info');
render(tripInfo, createTripCostTemplate(), 'beforeend');

const tripNavigation = body.querySelector('.trip-controls__navigation');
render(tripNavigation, createMenuTemplate(), 'beforeend');

const tripFilters = body.querySelector('.trip-controls__filters');
render(tripFilters, createFiltersTemplate(), 'beforeend');

const tripEvents = body.querySelector('.trip-events');
render(tripEvents, createSortTemplate(), 'beforeend');
render(tripEvents, createEventsListTemplate(), 'beforeend');

const eventsList = tripEvents.querySelector('.trip-events__list');
render(eventsList, createEditPointTemplate(), 'beforeend');
render(eventsList, createNewPointTemplate(), 'beforeend');

for (let i = 0; i < POINT_COUNT; i++) {
  render(eventsList, createPointTemplate(), 'beforeend');
}
