import React from 'react';
import { formatDate, formatDateTime, formatDateLong, formatRelativeDate } from '@/utils/dateUtils';

export type DateFormat = 'short' | 'datetime' | 'long' | 'relative';

interface DateDisplayProps {
  date: Date | string | number;
  format?: DateFormat;
  className?: string;
  showTime?: boolean;
  fallback?: string;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({
  date,
  format = 'short',
  className = '',
  fallback = '-',
}) => {
  if (!date) {
    return <span className={className}>{fallback}</span>;
  }

  try {
    let formattedDate: string;

    switch (format) {
      case 'short':
        formattedDate = formatDate(date);
        break;
      case 'datetime':
        formattedDate = formatDateTime(date);
        break;
      case 'long':
        formattedDate = formatDateLong(date);
        break;
      case 'relative':
        formattedDate = formatRelativeDate(date);
        break;
      default:
        formattedDate = formatDate(date);
    }

    return (
      <time
        dateTime={new Date(date).toISOString()}
        className={className}
        title={formatDateTime(date)}
      >
        {formattedDate}
      </time>
    );
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return <span className={className}>{fallback}</span>;
  }
};

export default DateDisplay; 