import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getTypes = (points) =>  Array.from(new Set(points.map((point) => point.type)));

export const sortByDecreasing = (array) => array.sort((a, b) => b - a);

export const getTypesPrice = (types, points) => {
  const sumOfMoney = [];

  types.forEach((type) => {
    let totalTypeMoney = 0;
    points.forEach((point) => {
      if (point.type === type) {
        totalTypeMoney += point.basicPrice;
      }
    });
    sumOfMoney.push(totalTypeMoney);
  });

  return sumOfMoney;
};

export const getTypesCount = (types, points) => {
  const allTypesCounts = [];

  types.forEach((type) => {
    let typeCount = 0;

    points.forEach((point) => {
      if (point.type === type) {
        typeCount ++;
      }
    });

    allTypesCounts.push(typeCount);
  });

  return allTypesCounts;
};

export const getTypesDuration = (types, points) => {
  const allTypesDuration = [];

  types.forEach((type) => {
    let typeDuration = 0;

    points.forEach((point) => {
      if (point.type === type) {
        const durationTime = dayjs(point.dateEnd).diff(dayjs(point.dateStart), 'minute');
        typeDuration += durationTime;
      }
    });

    allTypesDuration.push(typeDuration);
  });

  return allTypesDuration;
};

export const humanizeDuration = (time) => {
  const days = (time / 1440) > 1 ? `${Math.trunc(time / 1440)}D` : '';
  const hours = ((time % 1440) / 60) > 1 ? `${Math.trunc((time % 1440) / 60)}H` : '';
  const minutes = `${Math.trunc((time % 1440) % 60)}M`;

  return `${days} ${hours} ${minutes}`;
};
