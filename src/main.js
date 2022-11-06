import { createMenuTemplate } from './view/menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createTripCostTemplate } from './view/trip-cost';
import { createFiltersTemplate } from './view/filters';
import { createTripBoardTemplate } from './view/trip-board';
import { createEditPointTemplate } from './view/edit-point';
import { createPointTemplate } from './view/point';
import { generatePoint } from './mock/point-data';
import { generateFilter } from './mock/filter-data';

const POINT_COUNT = 21;
const body = document.querySelector('.page-body');

const points = new Array(POINT_COUNT).fill().map(generatePoint).sort((a, b) => a.dateStart - b.dateStart);
const filters = generateFilter(points);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = body.querySelector('.trip-main');
render(tripMainElement, createTripInfoTemplate(points), 'afterbegin');

const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, createTripCostTemplate(points), 'beforeend');

const tripNavigationElement = body.querySelector('.trip-controls__navigation');
render(tripNavigationElement, createMenuTemplate(), 'beforeend');

const tripFiltersElement = body.querySelector('.trip-controls__filters');
render(tripFiltersElement, createFiltersTemplate(filters), 'beforeend');

const tripBoardElement = body.querySelector('.trip-events');
render(tripBoardElement, createTripBoardTemplate(), 'beforeend');

const eventsListElement = tripBoardElement.querySelector('.trip-events__list');
render(eventsListElement, createEditPointTemplate(points[0]), 'beforeend');

for (let i = 1; i < POINT_COUNT; i++) {
  render(eventsListElement, createPointTemplate(points[i]), 'beforeend');
}
