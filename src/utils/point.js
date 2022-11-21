//timeDuration

const getTimeDuration = (dateStart, dateEnd) => {
  const difference = dateEnd.diff(dateStart, 'minute');
  const daysDiff = (difference / 1440) > 1 ? `${Math.trunc(difference / 1440)}D` : '';
  const hoursDiff = ((difference % 1440) / 60) > 1 ? `${Math.trunc((difference % 1440) / 60)}H` : '';
  const minutesDiff = `${Math.trunc((difference % 1440) % 60)}M`;

  return `${daysDiff} ${hoursDiff} ${minutesDiff}`;
};

export { getTimeDuration };
