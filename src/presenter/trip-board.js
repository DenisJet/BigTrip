import SortView from '../view/sort';
import PointsListView from '../view/points-list';
import NoPointsView from '../view/no-points';
import TripInfoView from '../view/trip-info';
import TripCostView from '../view/trip-cost';
import PointPresenter from './point';
import PointNewPresenter from './point-new';
import { remove, render, RenderPosition } from '../utils/render';
import { sortByDay, sortByPrice, sortByTime } from '../utils/point';
import { SortType, UpdateType, UserAction } from '../const';
import { filter } from '../utils/filter';

export default class TripBoard {
  constructor(boardComponent, tripInfoContainer, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._boardComponent = boardComponent;
    this._tripInfoContainer = tripInfoContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;
    this._tripCostComponent = null;
    this._tripInfoComponent = null;

    this._pointsListComponent = new PointsListView();
    this._noPointsComponent = new NoPointsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._pointsListComponent, this._handleViewAction);
  }

  init() {
    render(this._boardComponent, this._pointsListComponent, RenderPosition.BEFOREEND);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetSortType: true, dontResetTripInfo: true});

    remove(this._pointsListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint() {
    this._pointNewPresenter.init();
  }

  buttonNewDisabledHendler() {
    const button = document.querySelector('.trip-main__event-add-btn');

    if (button.hasAttribute('disabled')) {
      button.removeAttribute('disabled');
      return;
    }

    button.setAttribute('disabled', 'disabled');
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch(this._currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
    }

    return filteredPoints;
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderPointsList() {
    this._renderPoints(this._getPoints());
  }

  _renderNoPoints() {
    render(this._boardComponent, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetSortType = false, dontResetTripInfo = false} = {}) {
    this._pointNewPresenter.destroy();
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointsComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }

    if (dontResetTripInfo) {
      return;
    }

    remove(this._tripCostComponent);
    remove(this._tripInfoComponent);
    this._tripInfoComponent = null;
  }

  _renderTripInfo(points) {
    this._tripInfoComponent = new TripInfoView(points);
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    this._tripCostComponent = new TripCostView(points);
    render(this._tripInfoComponent, this._tripCostComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    const points = this._getPoints();

    if (points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPointsList();

    if (this._tripInfoComponent === null) {
      this._renderTripInfo(points);
    }
  }
}
