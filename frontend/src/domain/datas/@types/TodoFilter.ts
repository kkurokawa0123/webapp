export const TODO_TYPE = {
  A: "all",
  C: "checked",
  U: "unchecked",
  D: "deleted",
} as const;

export type Todo_type = (typeof TODO_TYPE)[keyof typeof TODO_TYPE];

// export type TodoFilter = "all" | "checked" | "unchecked" | "deleted";
