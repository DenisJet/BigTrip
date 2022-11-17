import NavMenuView from './view/nav-menu';
import TripInfoView from './view/trip-info';
import TripCostView from './view/trip-cost';
import FilterView from './view/filter';
import SortView from './view/sort';
import PointsListView from './view/points-list';
import PointEditView from './view/edit-point';
import PointView from './view/point';
import NoPointsView from './view/no-points';
import { generatePoint } from './mock/point-data';
import { generateFilter } from './mock/filter-data';
import { render, RenderPosition, isEscEvent } from './utils';

const POINT_COUNT = 20;
const body = document.querySelector('.page-body');

const renderPoint = (pointsList, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replacePointToForm = () => {
    pointsList.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointsList.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (isEscEvent) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector('.event--edit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointsList, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const points = new Array(POINT_COUNT).fill().map(generatePoint).sort((a, b) => a.dateStart - b.dateStart);
const filters = generateFilter(points);

const tripMainElement = body.querySelector('.trip-main');
render(tripMainElement, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, new TripCostView(points).getElement(), RenderPosition.BEFOREEND);

const tripNavigationElement = body.querySelector('.trip-controls__navigation');
render(tripNavigationElement, new NavMenuView().getElement(), RenderPosition.BEFOREEND);

const tripFiltersElement = body.querySelector('.trip-controls__filters');
render(tripFiltersElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

const tripBoardElement = body.querySelector('.trip-events');

const renderBoard = (boardContainer, boardPoints) => {
  const pointsListComponent = new PointsListView();

  if (boardPoints.length === 0) {
    render(boardContainer, new NoPointsView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardContainer, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(boardContainer, pointsListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < POINT_COUNT; i++) {
    renderPoint(pointsListComponent.getElement(), points[i]);
  }
};

renderBoard(tripBoardElement, points);
