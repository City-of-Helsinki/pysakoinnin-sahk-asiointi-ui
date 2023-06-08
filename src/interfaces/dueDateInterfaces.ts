export enum DueDateExtendableReason {
  None,
  Success,
  DueDateIsPast,
  HasUncollectableCheck,
  AlreadyExtended,
  HasNoChecks,
  HasTooManyChecks,
  HasObjectionsLinked,
  HasPaidCheck
}

export interface DueDateRequest {
  foul_number: string;
  register_number: string;
  metadata?: Record<string, string>;
}

export interface DueDateResponse {
  success: boolean;
  errorcode: string;
  internalErrorDescription: string;
  dueDate: string;
  dueDateExtendableReason: number;
  responseCode: number;
}
