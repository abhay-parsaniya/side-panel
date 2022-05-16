import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { sidepanelActions } from "../store/sidepanel-slice";

function ResponsiveDrawer(props) {
  const dispatch = useDispatch();

  const inputValue = useSelector((state) => state.sidepanel.inputValue);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    props.setState({ ...props.state, [anchor]: open });
    dispatch(sidepanelActions.setOperName("ADDITEM"));
  };

  const handleChange = (e) => {
    dispatch(
      sidepanelActions.setInputValue({
        id: inputValue.id ? inputValue.id : null,
        name: e.target.value,
      })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputValue.name.trim().length === 0) {
      return;
    }

    dispatch(
      sidepanelActions.setItemList({
        id: new Date().getTime(),
        name: inputValue.name,
      })
    );

    dispatch(
      sidepanelActions.setInputValue({
        id: null,
        name: "",
      })
    );

    props.setState({ left: false });
    dispatch(sidepanelActions.setOperName(""));
  };

  const list = (anchor) => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <form onSubmit={submitHandler}>
          <label>Item Name</label>
          <br />
          <input type="text" onChange={handleChange} value={inputValue.name} />

          <Button variant="contained" type="submit">
            Add
          </Button>
        </form>
      </List>
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment key={"left"}>
          <SwipeableDrawer
            anchor={"left"}
            open={props.state.left}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
}

export default ResponsiveDrawer;
