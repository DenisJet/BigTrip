// render функция

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

// случайное число

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//случайный элемент массива

const getRandomArrayElement = (array) => array[(getRandomInteger(0, (array.length - 1)))];

//случайный массив

const generateRandomArray = (array, minLength = 0, maxLength = array.length) => {
  let temp;
  let j;
  for (let i = array.length - 1; i > 0; i--) {
    j = getRandomInteger(0, i);
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  array.length = getRandomInteger(minLength, maxLength);
  return array;
};

//timeDuration

const getTimeDuration = (dateStart, dateEnd) => {
  const difference = dateEnd.diff(dateStart, 'minute');
  const daysDiff = (difference / 1440) > 1 ? `${Math.trunc(difference / 1440)}D` : '';
  const hoursDiff = ((difference % 1440) / 60) > 1 ? `${Math.trunc((difference % 1440) / 60)}H` : '';
  const minutesDiff = `${Math.trunc((difference % 1440) % 60)}M`;

  return `${daysDiff} ${hoursDiff} ${minutesDiff}`;
};

//isEscEvent

const isEscEvent = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export { getRandomInteger,
  getRandomArrayElement,
  generateRandomArray,
  getTimeDuration,
  render,
  createElement,
  RenderPosition,
  isEscEvent };
