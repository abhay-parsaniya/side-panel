import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { sidepanelActions } from "../store/sidepanel-slice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id, name) => {
    setOpen(true);
    editHandler(id, name);
  };
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.sidepanel.itemList);
  const inputValue = useSelector((state) => state.sidepanel.inputValue);

  const editHandler = (id, name) => {
    dispatch(sidepanelActions.setOperName("EDITITEM"));
    // props.setState({ left: true });
    dispatch(sidepanelActions.setInputValue({ id: id, name: name }));
  };

  const deleteHandler = (deleteItemId) => {
    const newItemList = itemList.filter((item) => deleteItemId !== item.id);
    dispatch(sidepanelActions.replaceItemList(newItemList));
  };

  const handleChange = (e) => {
    dispatch(
      sidepanelActions.setInputValue({
        id: inputValue.id ? inputValue.id : null,
        name: e.target.value,
      })
    );
  };

  const editActionHandler = () => {
    const newItemList = itemList.map((item) => {
      if (item.id === inputValue.id) {
        return { ...item, name: inputValue.name };
      }
      return item;
    });
    dispatch(sidepanelActions.replaceItemList(newItemList));
    dispatch(
      sidepanelActions.setInputValue({
        id: null,
        name: "",
      })
    );
    handleClose();
    dispatch(sidepanelActions.setOperName(""));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 650, margin: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">id</TableCell>
            <TableCell align="center">Item</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemList.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell
                align="center"
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <div>
                  <Button onClick={() => handleOpen(row.id, row.name)}>
                    Edit
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={inputValue.name}
                      />
                      <Button
                        variant="contained"
                        type="button"
                        onClick={editActionHandler}
                      >
                        Save
                      </Button>
                    </Box>
                  </Modal>
                </div>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => deleteHandler(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
