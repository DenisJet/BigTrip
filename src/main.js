import NavMenuView from './view/nav-menu';
import StatisticsView from './view/statistics';
import TripBoardPresenter from './presenter/trip-board';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import { generatePoint } from './mock/point-data';
import { render, RenderPosition, remove } from './utils/render';
import { sortByDay } from './utils/point';
import { MenuItem } from './const';

const POINT_COUNT = 20;
const body = document.querySelector('.page-body');
const mainElement = body.querySelector('.page-main');

const points = new Array(POINT_COUNT).fill().map(generatePoint).sort(sortByDay);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const navMenuComponent = new NavMenuView();
const tripNavigationElement = body.querySelector('.trip-controls__navigation');
render(tripNavigationElement, navMenuComponent, RenderPosition.BEFOREEND);

const tripBoardElement = body.querySelector('.trip-events');
const tripInfoElement = body.querySelector('.trip-main');
const tripBoardPresenter = new TripBoardPresenter(tripBoardElement, tripInfoElement, pointsModel, filterModel);

const tripFiltersElement = body.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(tripFiltersElement, filterModel, pointsModel);

let statisticsComponent = null;

const handleNavMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripBoardPresenter.init();
      tripBoardPresenter.buttonNewDisabledHendler();
      filterPresenter.filterDisabledHendler();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      filterPresenter.resetFilter();
      tripBoardPresenter.destroy();
      tripBoardPresenter.buttonNewDisabledHendler();
      filterPresenter.filterDisabledHendler();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(mainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

navMenuComponent.setMenuClickHandler(handleNavMenuClick);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripBoardPresenter.createPoint();
});

filterPresenter.init();
tripBoardPresenter.init();
