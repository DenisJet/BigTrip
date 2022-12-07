import NavMenuView from './view/nav-menu';
import TripInfoView from './view/trip-info';
import TripCostView from './view/trip-cost';
import FilterView from './view/filter';
import TripBoardPresenter from './presenter/trip-board';
import { generatePoint } from './mock/point-data';
import { generateFilter } from './mock/filter-data';
import { render, RenderPosition } from './utils/render';
import { sortByDay } from './utils/point';

const POINT_COUNT = 20;
const body = document.querySelector('.page-body');

const points = new Array(POINT_COUNT).fill().map(generatePoint).sort(sortByDay);
const filters = generateFilter(points);

const tripMainElement = body.querySelector('.trip-main');
render(tripMainElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, new TripCostView(points), RenderPosition.BEFOREEND);

const tripNavigationElement = body.querySelector('.trip-controls__navigation');
render(tripNavigationElement, new NavMenuView(), RenderPosition.BEFOREEND);

const tripFiltersElement = body.querySelector('.trip-controls__filters');
render(tripFiltersElement, new FilterView(filters), RenderPosition.BEFOREEND);

const tripBoardElement = body.querySelector('.trip-events');
const tripBoardPresenter = new TripBoardPresenter(tripBoardElement);

tripBoardPresenter.init(points);
