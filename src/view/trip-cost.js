import {createElement} from '../utils.js';

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

export default class TripCost {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
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
