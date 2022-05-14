import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Button from "@mui/material/Button";

function ResponsiveDrawer(props) {
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    props.setState({ ...props.state, [anchor]: open });
    props.setIsEdit(false);
  };

  const handleChange = (e) => {
    props.setInputValue((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (props.inputValue.name.trim().length === 0) {
      return;
    }

    props.setItemList((preValue) => {
      return [...preValue, { id: new Date().getTime(), name: props.inputValue.name}];
    });

    props.setInputValue({
      id: null,
      name: "",
    });

    props.setState({ left: false });
  };

  const editActionHandler = () => {
    const newItemList = props.itemList.map((item) => {
      if (item.id === props.inputValue.id) {
        return { ...item, name: props.inputValue.name };
      }
      return item;
    });
    props.setItemList(newItemList);
    props.setInputValue({
      id: null,
      name: ''
    })
    props.setState({left: false});
  };

  const list = (anchor) => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <form onSubmit={submitHandler}>
          <label>Item Name</label>
          <br />
          <input
            type="text"
            onChange={handleChange}
            value={props.inputValue.name}
          />
          {props.isEdit ? (
            <Button
              variant="contained"
              type="button"
              onClick={editActionHandler}
            >
              Save
            </Button>
          ) : (
            <Button variant="contained" type="submit">
              Add
            </Button>
          )}
        </form>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={props.state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ResponsiveDrawer;
