import {
  generateOffers,
  getOffers,
  generateDescription,
  generatePicturesArray
} from '../mock/point-data';
import { TYPES, CITIES } from '../const';
import { humanizeDate, compareTwoDates } from '../utils/point';
import SmartView from './smart';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  type: '',
  offers: [],
  destination: {},
  basicPrice: '',
  dateStart: '',
  dateEnd: '',
  isFavorite: false,
};

const createTypeItemTemplate = (availableTypes, currentType) =>
  availableTypes.map((type) =>
    `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
  </div>`,
  ).join('');

const createDestinationOptionTemplate = (availableCities) =>
  availableCities.map((city) => `<option value="${city}"></option>`).join('');

const createOfferTemplate = (offers) =>
  offers.length > 0 ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers.map(({title, price, isChecked}) => {
    const offerClassName = title.split(' ').pop();
    return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerClassName}-1" type="checkbox" name="event-offer-${offerClassName}" ${isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offerClassName}-1">
          <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`;
  }).join('')}
      </div>
      </section>` : '';

const createDestinationTemplate = (destination) =>
  destination ?
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${destination.pictures.length > 0 ?
    destination.pictures.map((pic) =>
      `<img class="event__photo" src="${pic.src}" alt="Event photo"></img>`).join('')
    : ''}
      </div>
    </div>
</section>` : '';

export const createEditPointTemplate = (point) => {
  const { type, offers, basicPrice, destination, dateStart, dateEnd} = point;

  const isSubmitDisabled = (dateStart === null || dateEnd === null);

  return  `
<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${createTypeItemTemplate(TYPES, type)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${createDestinationOptionTemplate(CITIES)}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateStart, 'DD/MM/YY HH:mm')}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateEnd, 'DD/MM/YY HH:mm')}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basicPrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? 'disabled' : ''}>Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    ${createOfferTemplate(offers)}
    ${createDestinationTemplate(destination)}
  </section>
</form>
</li>
`;
};

export default class PointEdit extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._state = PointEdit.parseDataToState(point);
    this._startDatePicker = null;
    this._endDatePicker = null;

    this._rollUpClickHandler = this._rollUpClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatePicker();
    this._setEndDatePicker();
  }

  reset(point) {
    this.updateData(
      PointEdit.parseDataToState(point),
    );
  }

  getTemplate() {
    return createEditPointTemplate(this._state);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatePicker();
    this._setEndDatePicker();
    this.setRollUpClickHandler(this._callback.rollUpClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setStartDatePicker() {
    if (this._startDatePicker) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }

    if (this._state.dateStart) {
      this._startDatePicker = flatpickr (
        this.getElement().querySelector('#event-start-time-1'),
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          defaultDate: this._state.dateStart,
          onChange: this._dateStartChangeHandler,
        },
      );
    }
  }

  _setEndDatePicker() {
    if (this._endDatePicker) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }

    if (this._state.dateEnd) {
      this._endDatePicker = flatpickr (
        this.getElement().querySelector('#event-end-time-1'),
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          defaultDate: this._state.dateEnd,
          onChange: this._dateEndChangeHandler,
        },
      );
    }
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._typeToggleHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationToggleHandler);
  }

  _dateStartChangeHandler(userDateStart) {
    if (compareTwoDates(this._state.dateEnd, userDateStart) < 0) {
      this.updateData({
        dateStart: userDateStart,
        dateEnd: userDateStart,
      });
      return;
    }

    this.updateData({
      dateStart: userDateStart,
    });
  }

  _dateEndChangeHandler(userDateEnd) {
    if (compareTwoDates(userDateEnd, this._state.dateStart) < 0) {
      userDateEnd = this._state.dateStart;
    }

    this.updateData({
      dateEnd: userDateEnd,
    });
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateData({
      type: evt.target.value,
      offers: getOffers(evt.target.value, generateOffers(TYPES)),
    });
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();

    if (!CITIES.includes(evt.target.value)) {
      return;
    }

    this.updateData({
      destination: {
        name: evt.target.value,
        description: generateDescription(),
        pictures: generatePicturesArray(),
      },
    });
  }

  _rollUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollUpClick();
  }

  setRollUpClickHandler(callback) {
    this._callback.rollUpClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollUpClickHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseStateToData(this._state));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._formSubmitHandler);
  }

  static parseDataToState(data) {
    return Object.assign({}, data);
  }

  static parseStateToData(state) {
    return Object.assign({}, state);
  }
}
