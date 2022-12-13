import AbstractView from './abstract';
import { humanizeDate } from '../utils/point';

const getRoute = (points) => {
  const destinations = new Set();
  points.forEach((point) => destinations.add(point.destination.name));
  const routePoints = Array.from(destinations);
  const route = routePoints.length <= 3 ?
    routePoints.join(' &#8212 ')
    : `${routePoints[0]} &#8212 &#8230 &#8212 ${routePoints[routePoints.length - 1]}`;

  return route;
};

const getDates = (points) => points && points.length ?
  `${humanizeDate(points[0].dateStart, 'MMM D')} &mdash; ${humanizeDate(points[points.length - 1].dateEnd, 'MMM D')}`
  : '';

const createTripInfoTemplate = (points) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getRoute(points)}</h1>

      <p class="trip-info__dates">${getDates(points)}</p>
    </div>
  </section>
  `;

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}
