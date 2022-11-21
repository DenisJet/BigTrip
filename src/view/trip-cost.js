import AbstractView from './abstract';

const getTripCost = (points) => {
  let totalBasicPrice = 0;
  let totalOffersPrice = 0;
  points.map((point) => {
    totalBasicPrice += point.basicPrice;
    point.offers.map((offer) => totalOffersPrice += offer.price);
  });

  return totalBasicPrice + totalOffersPrice;
};

const createTripCostTemplate = (points) => `
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCost(points)}</span>
  </p>
`;

export default class TripCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}
