export const IS_TRASHED_STATUS = {
  CHECKED: 1,
  UNCHECKED: 0,
} as const;

export type IsTrashedStatus =
  (typeof IS_TRASHED_STATUS)[keyof typeof IS_TRASHED_STATUS];
