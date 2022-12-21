// случайное число

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// случайное булевое значение

export const randomBoolean = () => Math.random() >= 0.5;

//случайный элемент массива

export const getRandomArrayElement = (array) => array[(getRandomInteger(0, (array.length - 1)))];

//случайный массив

export const generateRandomArray = (array, minLength = 0, maxLength = array.length) => {
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

//isEscEvent

export const isEscEvent = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');
