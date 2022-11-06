const createFiltersItemTemplate = (filters, isChecked) =>
  filters.map(({name}) => `
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>
  `).join('');

export const createFiltersTemplate = (filters) => `
  <form class="trip-filters" action="#" method="get">
    ${createFiltersItemTemplate(filters)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;
