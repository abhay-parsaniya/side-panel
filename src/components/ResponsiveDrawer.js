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
    props.setOperName("ADDITEM");
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
      return [
        ...preValue,
        { id: new Date().getTime(), name: props.inputValue.name },
      ];
    });

    props.setInputValue({
      id: null,
      name: "",
    });

    props.setState({ left: false });
    props.setOperName('');
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
      name: "",
    });
    props.setState({ left: false });
    props.setOperName('');
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
          {props.operName === 'EDITITEM' ? (
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
      {
        <React.Fragment key={'left'}>
          <SwipeableDrawer
              anchor={'left'}
              open={props.state.left}
              onClose={toggleDrawer('left', false)}
              onOpen={toggleDrawer('left', true)}
            >
              {list('left')}
            </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
}

export default ResponsiveDrawer;
