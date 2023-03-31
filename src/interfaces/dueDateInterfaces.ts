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
