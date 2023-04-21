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

export interface ObjectionForm {
  foulNumber?: string;
  transferNumber?: string;
  registerNumber?: string;
  ssn?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  newEmail?: string;
  newEmailConfirm?: string;
  toSeparateEmail?: boolean;
  mobilePhone?: string;
  iban?: string;
  authorRole?: AuthorRole | number;
  address?: {
    streetAddress: string;
    postCode: string;
    postOffice: string;
  };
  description?: string;
  poaFile?: FileItem;
  attachments?: FileItem[];
  type?: number;
  deliveryDecision?: string;
  sendDecisionViaEService?: boolean;
  dueDate?: string;
  success?: boolean;
  errorcode?: string | null;
  internalErrorDescription?: string | null;
  dueDateExtendableReason?: number;
  responseCode?: number;
}

export type ObjectionControlType = Control<ObjectionForm>;

export interface ObjectionDocumentResponse {
  count: number;
  next: number;
  previous: number;
  results: ObjectionDocument[];
}

export interface Status {
  value: string;
  timestamp: string;
}

export interface ObjectionDocument {
  id: string;
  created_at: string;
  updated_at: string;
  status: Status;
  status_histories: Status[];
  type: string;
  service: string;
  user_id: string;
  transaction_id: string;
  business_id: string;
  tos_function_id: string;
  tos_record_id: string;
  content: ObjectionForm;
  draft: boolean;
  locked_after: string;
  deletable: boolean;
  attachments: FileItem[];
}

export type ObjectionResponse = {
  ObjectionNumber: number;
  ObjectionStatusText: string;
  FoulRegisterNumber: string;
  TransferRegisterNumber: string;
};

export enum ObjectionType {
  Foul,
  Transfer
}
