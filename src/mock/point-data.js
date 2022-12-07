import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { TYPES, CITIES } from '../const';
import { getRandomInteger, getRandomArrayElement, generateRandomArray } from '../utils/common';

//types and offers

const generateOffer = (type) => {
  const availableOffers = [
    {
      title: 'Choose seats',
      price: 5,
    },
    {
      title: 'Travel by train',
      price: 40,
    },
    {
      title: 'Order uber',
      price: 20,
    },
    {
      title: 'Add luggage',
      price: 50,
    },
    {
      title: 'Add meal',
      price: 15,
    },
    {
      title: 'Switch to comfort',
      price: 80,
    },
  ];

  return {
    type,
    offers: generateRandomArray(availableOffers, 0, 5),
  };
};

const generateOffers = (typesArr) => typesArr.map((type) => generateOffer(type));

const getOffers = (type, offers) => offers.find((item) => item.type === type).offers;

//destination

const generatePicture = () => ({
  src: `http://picsum.photos/248/152?r=${Math.random()}`,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
});

const generateDestination = () => {
  const availableDescriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  return {
    name: getRandomArrayElement(CITIES),
    description: generateRandomArray(availableDescriptions, 1, 5).join(' '),
    pictures: new Array(getRandomInteger(1, 5)).fill().map(generatePicture),
  };
};

//generateDate

const generateDate = () => {
  const start = dayjs().add(getRandomInteger(-4320, 4320), 'm');
  const end = dayjs(start).add(getRandomInteger(30, 1620), 'm');
  return {
    start,
    end,
  };
};

//genratePoint

const generatePoint = () => {
  const type = getRandomArrayElement(TYPES);
  const offers = generateOffers(TYPES);
  const destination = generateDestination();
  const date = generateDate();

  return {
    id: nanoid(),
    type,
    offers: getOffers(type, offers),
    destination: destination.name,
    basicPrice: getRandomInteger(100, 1000),
    dateStart: date.start,
    dateEnd: date.end,
    isFavorite: Boolean(getRandomInteger()),
  };
};

export { generateDestination, generatePoint };
