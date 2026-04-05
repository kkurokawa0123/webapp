import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import { Drawer } from "@mui/material";
// import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Person from "@mui/icons-material/Person";
// import CreateIcon from "@mui/icons-material/Create";
import SubjectIcon from "@mui/icons-material/Subject";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { styled } from "@mui/material/styles";
import { indigo, lightBlue, pink } from "@mui/material/colors";

import { useAuthContex } from "@/presentation/contexts/auth_context";
import { type Todo_type } from "@/domain/datas/@types/TodoFilter";

// ドロワー内リストの幅をカスタマイズ
const DrawerList = styled("div")(() => ({
  width: 250,
}));

// ドロワーヘッダーのサイズ・色などをカスタマイズ
const DrawerHeader = styled("div")(() => ({
  height: 150,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1em",
  backgroundColor: indigo[500],
  color: "#ffffff",
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
}));

// ヘッダー内に表示するアバターのカスタマイズ
const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

type Props = {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  onFilter: (filter: Todo_type) => void;
};

export const TodoSideBar = (props: Props) => {
  const { authData } = useAuthContex();

  return (
    <>
      <Drawer
        variant="temporary"
        open={props.drawerOpen}
        onClose={props.onToggleDrawer}
      >
        <DrawerList role="presentation" onClick={props.onToggleDrawer}>
          <DrawerHeader>
            <DrawerAvatar>
              <Person />
            </DrawerAvatar>
            <p>ユーザー名:{authData?.name}</p>
            <p>TODO v{1.1}</p>
          </DrawerHeader>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                aria-label="list-all"
                onClick={() => props.onFilter("all")}
              >
                <ListItemIcon>
                  <SubjectIcon />
                </ListItemIcon>
                <ListItemText secondary="すべてのタスク" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                aria-label="list-all"
                onClick={() => props.onFilter("unchecked")}
              >
                <ListItemIcon>
                  <RadioButtonUncheckedIcon sx={{ color: lightBlue[500] }} />
                </ListItemIcon>
                <ListItemText secondary="未完了のタスク" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                aria-label="list-all"
                onClick={() => props.onFilter("checked")}
              >
                <ListItemIcon>
                  <CheckCircleOutlineIcon sx={{ color: pink.A200 }} />
                </ListItemIcon>
                <ListItemText secondary="完了したタスク" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                aria-label="list-all"
                onClick={() => props.onFilter("deleted")}
              >
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText secondary="ごみ箱" />
              </ListItemButton>
            </ListItem>
          </List>
        </DrawerList>
      </Drawer>
    </>
  );
};
// export default TodoSideBar;
