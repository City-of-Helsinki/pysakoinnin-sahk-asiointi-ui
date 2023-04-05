/* eslint-disable no-magic-numbers */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { FoulData, FoulRequest } from '../../interfaces/foulInterfaces';
import {
  TransferData,
  TransferRequest
} from '../../interfaces/transferInterfaces';
import { getFoulData } from '../../services/foulService';
import { getTransferData } from '../../services/transferService';
import { AxiosError } from 'axios';
import {
  completeStep,
  disablePreviousSteps
} from '../formStepper/formStepperSlice';
import {
  AuthorRole,
  Objection,
  ObjectionForm
} from '../../interfaces/objectionInterfaces';
import { saveObjection } from '../../services/objectionService';
import { DueDateRequest } from '../../interfaces/dueDateInterfaces';
import { extendDueDate } from '../../services/dueDateService';

export enum FormId {
  NONE = '',
  DUEDATE = 'due-date',
  PARKINGFINE = 'parking-fine',
  MOVEDCAR = 'moved-car'
}

export type FormState = {
  formSubmitted: boolean;
  selectedForm: FormId;
  submitDisabled: boolean;
  formValues: ObjectionForm;
  foulData: FoulData | undefined;
  transferData: TransferData | undefined;
  formError: string | null;
  submitError: boolean;
  emailConfirmation: boolean;
  dueDate: string | undefined;
};

const initialState: FormState = {
  formSubmitted: false,
  selectedForm: FormId.NONE,
  submitDisabled: true,
  foulData: undefined,
  transferData: undefined,
  formError: null,
  submitError: false,
  emailConfirmation: false,
  dueDate: undefined,
  formValues: {
    foulNumber: '',
    transferNumber: '',
    registerNumber: '',
    ssn: '',
    firstName: '',
    lastName: '',
    email: '',
    newEmail: '',
    newEmailConfirm: '',
    toSeparateEmail: false,
    mobilePhone: '',
    iban: '',
    authorRole: AuthorRole.Undefined,
    address: {
      streetAddress: '',
      postCode: '',
      postOffice: ''
    },
    description: '',
    poaFile: {
      fileName: '',
      mimeType: '',
      data: '',
      size: 0
    },
    attachments: [],
    type: 0,
    deliveryDecision: '',
    sendDecisionViaEService: true
  }
};

export const getFoulDataThunk = createAsyncThunk(
  'formContent/getFoulData',
  async (req: FoulRequest, thunkAPI) =>
    await getFoulData(req)
      .then(res => {
        const activeStep = (thunkAPI.getState() as RootState).formStepper
          .activeStepIndex;
        thunkAPI.dispatch(completeStep(activeStep));
        return res;
      })
      .catch((err: AxiosError) =>
        thunkAPI.rejectWithValue(err.response?.status)
      )
);

export const getTransferDataThunk = createAsyncThunk(
  'formContent/getTransferData',
  async (req: TransferRequest, thunkAPI) =>
    await getTransferData(req)
      .then(res => {
        const activeStep = (thunkAPI.getState() as RootState).formStepper
          .activeStepIndex;
        thunkAPI.dispatch(completeStep(activeStep));
        return res;
      })
      .catch((err: AxiosError) =>
        thunkAPI.rejectWithValue(err.response?.status)
      )
);

export const extendDueDateThunk = createAsyncThunk(
  'formContent/extendDueDate',
  async (req: DueDateRequest, thunkAPI) =>
    await extendDueDate(req)
      .then(res => {
        const activeStep = (thunkAPI.getState() as RootState).formStepper
          .activeStepIndex;
        thunkAPI.dispatch(disablePreviousSteps(activeStep));
        return res;
      })
      .catch((err: AxiosError) =>
        thunkAPI.rejectWithValue(err.response?.status)
      )
);

export const saveObjectionThunk = createAsyncThunk(
  'formContent/saveObjection',
  async (req: Objection, thunkAPI) =>
    await saveObjection(req)
      .then(res => {
        const activeStep = (thunkAPI.getState() as RootState).formStepper
          .activeStepIndex;
        thunkAPI.dispatch(disablePreviousSteps(activeStep));
        return res;
      })
      .catch((err: AxiosError) =>
        thunkAPI.rejectWithValue(err.response?.status)
      )
);

const handleFormError = (status: number | undefined, form: FormId) => {
  switch (status) {
    case 404:
    case 422:
      return `${form}:errors:not-found`;
    // 500, 503 etc.
    default:
      return 'common:errors:unknown';
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
    },
    setFormError: (state, action) => {
      state.formError = action.payload;
    },
    setEmailConfirmation: (state, action) => {
      state.emailConfirmation = action.payload;
    },
    setSubmitError: (state, action) => {
      state.submitError = action.payload;
    }
  },
  extraReducers: builder => {
    // GET FoulData
    builder.addCase(getFoulDataThunk.fulfilled, (state, action) => ({
      ...state,
      foulData: action.payload,
      formError: null
    }));
    builder.addCase(getFoulDataThunk.rejected, (state, action) => ({
      ...state,
      formError: handleFormError(
        action.payload as number | undefined,
        FormId.PARKINGFINE
      )
    }));
    // GET TransferData
    builder.addCase(getTransferDataThunk.fulfilled, (state, action) => ({
      ...state,
      transferData: action.payload,
      formError: null
    }));
    builder.addCase(getTransferDataThunk.rejected, (state, action) => ({
      ...state,
      formError: handleFormError(
        action.payload as number | undefined,
        FormId.MOVEDCAR
      )
    }));
    // POST ExtendDueDate
    builder.addCase(extendDueDateThunk.fulfilled, (state, action) => ({
      ...state,
      formSubmitted: true,
      dueDate: action.payload.dueDate,
      submitError: false
    }));
    builder.addCase(extendDueDateThunk.rejected, state => ({
      ...state,
      submitError: true
    }));
    // POST SaveObjection
    builder.addCase(saveObjectionThunk.fulfilled, state => ({
      ...state,
      formSubmitted: true,
      submitError: false
    }));
    builder.addCase(saveObjectionThunk.rejected, state => ({
      ...state,
      submitError: true
    }));
  }
});

// Actions
export const {
  setFormSubmitted,
  setSelectedForm,
  setSubmitDisabled,
  setFormValues,
  setFormError,
  setEmailConfirmation,
  setSubmitError
} = slice.actions;

// Selectors
export const selectFormContent = (state: RootState) => state.formContent;

export const selectFormValues = (state: RootState) =>
  state.formContent.formValues;

export default slice.reducer;
