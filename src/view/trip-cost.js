const getTripCost = (points) => {
  let totalBasicPrice = 0;
  let totalOffersPrice = 0;
  points.map((point) => {
    totalBasicPrice += point.basicPrice;
    point.offers.map((offer) => totalOffersPrice += offer.price);
  });

  return totalBasicPrice + totalOffersPrice;
};

export const createTripCostTemplate = (points) => `
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCost(points)}</span>
  </p>
`;
