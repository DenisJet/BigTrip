import {createElement} from '../utils.js';

const getRoute = (points) => {
  const destinations = new Set();
  points.forEach((point) => destinations.add(point.destination));
  const routePoints = Array.from(destinations);
  const route = routePoints.length <= 3 ?
    routePoints.join(' &#8212 ')
    : `${routePoints[0]} &#8212 &#8230 &#8212 ${routePoints[routePoints.length - 1]}`;

  return route;
};

const getDates = (points) => points && points.length ?
  `${points[0].dateStart.format('MMM D')} &mdash; ${points[points.length - 1].dateEnd.format('MMM D')}`
  : '';

const createTripInfoTemplate = (points) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getRoute(points)}</h1>

      <p class="trip-info__dates">${getDates(points)}</p>
    </div>
  </section>
  `;

export default class TripInfo {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
