import SortView from '../view/sort';
import PointsListView from '../view/points-list';
import NoPointsView from '../view/no-points';
import PointPresenter from './point';
import { updateItem } from '../utils/common';
import { render, RenderPosition } from '../utils/render';
import { sortByDay, sortByPrice, sortByTime } from '../utils/point';
import { SortType } from '../const';

export default class TripBoard {
  constructor(boardComponent) {
    this._boardComponent = boardComponent;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = new SortView();
    this._pointsListComponent = new PointsListView();
    this._noPointsComponent = new NoPointsView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardPoints) {
    this._boardPoints = boardPoints.slice();
    this._sourcedBoardPoints = boardPoints.slice();

    render(this._boardComponent, this._pointsListComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._boardPoints = updateItem(this._boardPoints, updatedPoint);
    this._sourcedBoardPoints = updateItem(this._sourcedBoardPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _sortPoints(sortType) {
    switch(sortType) {
      case SortType.DAY:
        this._boardPoints.sort(sortByDay);
        break;
      case SortType.PRICE:
        this._boardPoints.sort(sortByPrice);
        break;
      case SortType.TIME:
        this._boardPoints.sort(sortByTime);
        break;
      default:
        throw new Error('Unknow sort type');
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointsList();
    this._renderPointsList();
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(from, to) {
    this._boardPoints
      .slice(from, to)
      .forEach((boardPoint) => {
        this._renderPoint(boardPoint);
      });
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderPointsList() {
    this._renderPoints(0, this._boardPoints.length);
  }

  _renderNoPoints() {
    render(this._boardComponent, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if (this._boardPoints.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPointsList();
  }
}
