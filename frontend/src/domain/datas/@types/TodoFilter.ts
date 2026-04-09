export const TODO_TYPE = {
  ALL: "all",
  CHECK: "checked",
  UNCHECK: "unchecked",
  TRASH: "deleted",
} as const;

export type Todo_type = (typeof TODO_TYPE)[keyof typeof TODO_TYPE];
