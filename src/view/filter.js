import {createElement} from '../utils.js';

const createFilterItemTemplate = (filters, isChecked) =>
  filters.map(({name}) => `
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>
  `).join('');

const createFilterTemplate = (filters) => `
  <form class="trip-filters" action="#" method="get">
    ${createFilterItemTemplate(filters)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
