import Fab from "@mui/material/Fab";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

import { useTodoStatusContext } from "@/presentation/contexts/todo_status_context";

// import type { Todo } from "@/domain/datas/api/todo_data";
// import { type Todo_type } from "@/domain/datas/@types/TodoFilter";

import { styled } from "@mui/material/styles";

type Props = {
  // todos: Todo[] | undefined;
  // todoFilter: Todo_type;
  // alertOpen: boolean;
  onToggleDialog: () => void;
  onToggleAlert: () => void;
};

const FabButton = styled(Fab)({
  position: "fixed",
  right: 15,
  bottom: 15,
});

export const TodoActionButton = (props: Props) => {
  const { todoFilter } = useTodoStatusContext();
  return (
    <>
      {todoFilter === "deleted" ? (
        <FabButton
          aria-label="fab-delete-button"
          color="secondary"
          onClick={props.onToggleAlert}
        >
          <DeleteIcon />
        </FabButton>
      ) : (
        <FabButton
          aria-label="fab-add-button"
          color="secondary"
          onClick={props.onToggleDialog}
        >
          <CreateIcon />
        </FabButton>
      )}
    </>
  );
};
