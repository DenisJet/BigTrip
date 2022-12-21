import AbstractView from './abstract';
import { MenuItem } from '../const';

const createNavMenuTemplate = () =>`
  <nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu-item=${MenuItem.TABLE}>${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#" data-menu-item=${MenuItem.STATS}>Stats</a>
  </nav>
`;

export default class NavMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._prevActivItem = MenuItem.TABLE;
  }

  getTemplate() {
    return createNavMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'A') {
      return;
    }

    if (evt.target.dataset.menuItem === this._prevActivItem) {
      return;
    }

    this._callback.menuClick(evt.target.dataset.menuItem);
    this._prevActivItem = evt.target.dataset.menuItem;
    this._setMenuItem();
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  _setMenuItem() {
    const tableItem = this.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`);
    const statsItem = this.getElement().querySelector(`[data-menu-item=${MenuItem.STATS}]`);

    if (tableItem !== null && statsItem !== null) {
      tableItem.classList.toggle('trip-tabs__btn--active');
      statsItem.classList.toggle('trip-tabs__btn--active');
    }
  }
}
