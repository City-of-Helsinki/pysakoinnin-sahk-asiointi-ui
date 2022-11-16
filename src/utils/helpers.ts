import { addDays, format, formatISO } from 'date-fns';

const EXTENDEDDAYS = 30;

export function formatDate(date: Date): string {
  return format(date, 'dd.MM.yyyy');
}

// add 30 days to the original date and return the new date
export function getNewDueDate(date: Date): string {
  return formatDate(addDays(date, EXTENDEDDAYS));
}

// check if date is the present day or in future
function isInFuture(date: Date): boolean {
  // compare only dates and not times
  const currentDate = formatISO(new Date(), { representation: 'date' });
  const comparedDate = formatISO(date, { representation: 'date' });
  return comparedDate >= currentDate;
}

// in future there will be multiple possible reasons why extending
// due date is not allowed
export function isExtensionAllowed(date: Date): boolean {
  return isInFuture(date);
}
