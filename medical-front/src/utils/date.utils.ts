import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), "dd 'de' MMMM yyyy, HH:mm", {
      locale: es,
    });
  } catch {
    return dateString;
  }
};

export const toISOLocal = (dateString: string): string => {
  return new Date(dateString).toISOString();
};