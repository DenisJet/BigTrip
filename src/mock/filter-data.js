import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

const pointToFilterMap = {
  everything: (points) => points,
  future: (points) => points.filter((point) => dayjs().isSameOrAfter(point.dateStart, 'day')),
  past: (points) => points.filter((point) => dayjs().isBefore(point.dateEnd)),
};

const generateFilter = (pointsData) => Object.entries(pointToFilterMap).map(([filterName, points]) => ({
  name: filterName,
  points: points(pointsData),
}));

export { generateFilter };
