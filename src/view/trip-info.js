const getRoute = (points) => {
  const destinations = new Set();
  points.forEach((point) => destinations.add(point.destination));
  const routePoints = Array.from(destinations);
  const route = routePoints.length <= 3 ? routePoints.join('&mdash') : `${routePoints[0]} &mdash; &#8230; &mdash; ${routePoints[routePoints.length - 1]}`;
  return route;
};

const getDates = (points) => `${points[0].dateStart.format('MMM D')} &mdash; ${points[points.length - 1].dateEnd.format('MMM D')}`;

export const createTripInfoTemplate = (points) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getRoute(points)}</h1>

      <p class="trip-info__dates">${getDates(points)}</p>
    </div>
  </section>
  `;
