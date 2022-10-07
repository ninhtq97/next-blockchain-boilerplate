import { DATE_FORMAT } from 'constants/date';
import { format } from 'date-fns';

export const formatDate = (
  date: string | number | Date,
  formatStr = DATE_FORMAT.DATE,
) => (date ? format(new Date(date), formatStr) : date);

export const ms2DHMS = (duration: number) => {
  const seconds = (Math.floor(duration / 1000) % 60)
      .toString()
      .padStart(2, '0'),
    minutes = (Math.floor(duration / (1000 * 60)) % 60)
      .toString()
      .padStart(2, '0'),
    hours = (Math.floor(duration / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, '0'),
    days = (Math.floor(duration / (1000 * 60 * 60 * 24)) % 24)
      .toString()
      .padStart(2, '0');

  return { hours, days, minutes, seconds };
};
