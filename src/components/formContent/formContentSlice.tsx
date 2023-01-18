import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Control } from 'react-hook-form';

export enum FormId {
  NONE = '',
  DUEDATE = 'due-date',
  PARKINGFINE = 'parking-fine',
  MOVEDCAR = 'moved-car'
}

export type FileItem = {
  name: string;
  size: number;
  type: string;
};

export type RectificationFormType = {
  invoiceNumber: string;
  refNumber: string;
  regNumber: string;
  relation: string;
  poaFile: FileItem;
  attachments: FileItem[];
  toSeparateEmail: boolean;
  newEmailAddress: string;
  newEmailConfirm: string;
  address: string;
  zipCode: string;
  city: string;
  countryCode: string;
  phone: string;
  IBAN: string;
  rectificationContent: string;
  deliveryDecision: string;
};

export type RectificationControlType = Control<RectificationFormType>;

export type FormState = {
  formSubmitted: boolean;
  selectedForm: FormId;
  submitDisabled: boolean;
  formValues: RectificationFormType;
};

const initialState: FormState = {
  formSubmitted: false,
  selectedForm: FormId.NONE,
  submitDisabled: true,
  formValues: {
    invoiceNumber: '',
    refNumber: '',
    regNumber: '',
    relation: '',
    poaFile: {
      name: '',
      size: 0,
      type: ''
    },
    attachments: [],
    toSeparateEmail: false,
    newEmailAddress: '',
    newEmailConfirm: '',
    address: '',
    zipCode: '',
    city: '',
    countryCode: '+358',
    phone: '',
    IBAN: '',
    rectificationContent: '',
    deliveryDecision: ''
  }
};

export const slice = createSlice({
  name: 'formContent',
  initialState,
  reducers: {
    setFormSubmitted: (state, action) => {
      state.formSubmitted = action.payload;
    },
    setSelectedForm: (state, action) => {
      state.selectedForm = action.payload;
    },
    setSubmitDisabled: (state, action) => {
      state.submitDisabled = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = { ...state.formValues, ...action.payload };
    }
  }
});

// Actions
export const {
  setFormSubmitted,
  setSelectedForm,
  setSubmitDisabled,
  setFormValues
} = slice.actions;

// Selectors
export const selectFormContent = (state: RootState) => state.formContent;

export const selectFormValues = (state: RootState) =>
  state.formContent.formValues;

export default slice.reducer;
