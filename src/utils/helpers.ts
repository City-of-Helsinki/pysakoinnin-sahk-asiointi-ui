/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDays, format, formatISO } from 'date-fns';
import { FoulAttachment } from '../interfaces/foulInterfaces';
import {
  ObjectionForm,
  ObjectionType
} from '../interfaces/objectionInterfaces';

const EXTENDEDDAYS = 30;
const BYTES_IN_KB = 1024;

// from 'yyyy-mm-dd' to 'dd.mm.yyyy'
export function formatDate(date: string | Date): string {
  return format(new Date(date), 'd.M.yyyy');
}

// from 'yyyy-mm-ddTHH:mm:ssZ' to 'd.mm.yyyy klo HH:mm'
export function formatDateTime(date: string): string {
  return format(new Date(date), "d.M.yyyy 'klo' H:mm");
}

// from Date to 'yyyy-mm-dd'
export function formatISODate(date: Date): string {
  return formatISO(date, { representation: 'date' });
}

// add 30 days to the original date and return the new date
export function getNewDueDate(date: string): Date {
  return addDays(new Date(date), EXTENDEDDAYS);
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

// sort two dates either in ascending or descending order
export const sortByDate = (a: string, b: string, sortByNewest: boolean) =>
  sortByNewest ? Date.parse(b) - Date.parse(a) : Date.parse(a) - Date.parse(b);

/* format attachment to valid base64 string (e.g. 'data:image/jpeg;base64,AAAA...')
  that can be displayed as image in the UI */
export const formatBase64String = (attachment: FoulAttachment) =>
  attachment.data.startsWith('data')
    ? attachment.data
    : `data:${attachment.mimeType};base64,${attachment.data}`;

/* modifies objection/rectification form to align with the Objection type,
  so it can be sent to PASI */
export const createObjection = (form: ObjectionForm) => {
  // remove unnecessary properties
  const {
    transferNumber,
    deliveryDecision,
    newEmail,
    newEmailConfirm,
    poaFile,
    toSeparateEmail,
    ...objection
  } = { ...form };
  // add POA file to attachments
  if (form.poaFile && form.poaFile.fileName !== '' && objection.attachments) {
    objection.attachments.push(form.poaFile);
  }
  // add missing properties
  objection.sendDecisionViaEService =
    form.deliveryDecision === 'toParkingService';
  objection.type = form.foulNumber
    ? ObjectionType.Foul
    : ObjectionType.Transfer;
  // make sure authorRole is in correct format
  objection.authorRole = Number(objection.authorRole);
  return objection;
};
