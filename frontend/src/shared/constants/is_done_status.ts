export const IS_DONE_STATUS = {
  CHECKED: 1,
  UNCHECKED: 0,
} as const;

export type IsDoneStatus = (typeof IS_DONE_STATUS)[keyof typeof IS_DONE_STATUS];
