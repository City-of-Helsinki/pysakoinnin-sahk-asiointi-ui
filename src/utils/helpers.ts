import { addDays, format, formatISO } from 'date-fns';

const EXTENDEDDAYS = 30;
const BREAKPOINT_M = 768;
const BYTES_IN_KB = 1024;

// from 'yyyy-mm-dd' to 'dd.mm.yyyy'
export function formatDate(date: string): string {
  return format(new Date(date), 'dd.MM.yyyy');
}

// from Date to 'yyyy-mm-dd'
export function formatISODate(date: Date): string {
  return formatISO(date, { representation: 'date' });
}

// add 30 days to the original date and return the new date
export function getNewDueDate(date: string): Date {
  return addDays(new Date(date), EXTENDEDDAYS);
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

export function isSmallScreen(width: number): boolean {
  return width < BREAKPOINT_M;
}

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) {
    return '0 B';
  }

  const sizeUnits: string[] = ['B', 'KB', 'MB', 'GB', 'TB'];
  const sizeUnitIndex = Math.floor(Math.log(bytes) / Math.log(BYTES_IN_KB));
  const sizeInUnit = bytes / BYTES_IN_KB ** sizeUnitIndex;
  return `${
    sizeUnitIndex < 2 || sizeInUnit % 1 === 0
      ? Math.round(sizeInUnit)
      : sizeInUnit.toFixed(1)
  } ${sizeUnits[sizeUnitIndex]}`;
};
