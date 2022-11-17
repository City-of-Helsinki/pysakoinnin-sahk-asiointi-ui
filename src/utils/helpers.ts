import { addDays, format, formatISO } from 'date-fns';

const EXTENDEDDAYS = 30;

// from 'yyyy-mm-dd' to 'dd.mm.yyyy'
export function formatDate(date: string | Date): string {
  return format(new Date(date), 'dd.MM.yyyy');
}

// add 30 days to the original date and return the new date
export function getNewDueDate(date: string): string {
  return formatDate(addDays(new Date(date), EXTENDEDDAYS));
}

// check if date is the present day or in future
function isInFuture(date: string): boolean {
  // compare only dates and not times
  const currentDate = formatISO(new Date(), { representation: 'date' });
  const comparedDate = formatISO(new Date(date), { representation: 'date' });
  return comparedDate >= currentDate;
}

// in future there will be multiple possible reasons why extending
// due date is not allowed
export function isExtensionAllowed(date: string): boolean {
  return isInFuture(date);
}
