import Fab from "@mui/material/Fab";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

import { useTodoStatusContext } from "@/presentation/contexts/todo_status_context";

type Props = {
  isNotTrashedTodo: boolean;
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
          disabled={props.isNotTrashedTodo}
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
