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
import { isEscEvent } from './utils/common';
import { render, RenderPosition, replace, remove} from './utils/render';

const POINT_COUNT = 20;
const body = document.querySelector('.page-body');

const renderPoint = (pointsList, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (isEscEvent) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setRollUpClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setRollUpClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointsList, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const points = new Array(POINT_COUNT).fill().map(generatePoint).sort((a, b) => a.dateStart - b.dateStart);
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

const renderBoard = (boardContainer, boardPoints) => {
  const pointsListComponent = new PointsListView();

  if (boardPoints.length === 0) {
    render(boardContainer, new NoPointsView(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardContainer, new SortView(), RenderPosition.BEFOREEND);
  render(boardContainer, pointsListComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < POINT_COUNT; i++) {
    renderPoint(pointsListComponent, points[i]);
  }
};

renderBoard(tripBoardElement, points);
