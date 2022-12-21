import { FilterType } from '../const';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateStart)),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isSameOrAfter(point.dateEnd, 'day')),
};
