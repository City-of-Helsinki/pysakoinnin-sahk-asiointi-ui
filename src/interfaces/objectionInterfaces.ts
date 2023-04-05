import { Control } from 'react-hook-form';

// data is base64 string
export type FileItem = {
  fileName: string;
  mimeType: string;
  data: string;
  size: number;
};

export enum AuthorRole {
  Undefined = '0',
  Driver = '1',
  Owner = '2',
  Possessor = '3',
  Other = '4'
}

export interface Objection {
  foulNumber?: string;
  transferNumber?: string;
  registerNumber: string;
  ssn: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  iban: string;
  authorRole: AuthorRole;
  address: {
    streetAddress: string;
    postCode: string;
    postOffice: string;
  };
  description: string;
  attachments: FileItem[];
  type: number;
  sendDecisionViaEService: boolean;
}

export interface ObjectionForm {
  foulNumber: string;
  transferNumber: string;
  registerNumber: string;
  ssn: string;
  firstName: string;
  lastName: string;
  email: string;
  newEmail: string;
  newEmailConfirm: string;
  toSeparateEmail: boolean;
  mobilePhone: string;
  iban: string;
  authorRole: AuthorRole;
  address: {
    streetAddress: string;
    postCode: string;
    postOffice: string;
  };
  description: string;
  poaFile: FileItem;
  attachments: FileItem[];
  type: number;
  deliveryDecision: string;
  sendDecisionViaEService: boolean;
}

export type ObjectionControlType = Control<ObjectionForm>;

export type ObjectionResponse = {
  ObjectionNumber: number;
  ObjectionStatusText: string;
  FoulRegisterNumber: string;
  TransferRegisterNumber: string;
};
