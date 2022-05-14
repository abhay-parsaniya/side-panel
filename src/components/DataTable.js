import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';

export default function BasicTable(props) {

  const editHandler = (id, name) => {
    props.setOperName("EDITITEM");
    props.setState({left: true});
    props.setInputValue({id: id, name: name});
  };


  const deleteHandler = (deleteItemId) => {
    const newItemList = props.itemList.filter((item) => deleteItemId !== item.id);
    props.setItemList(newItemList);
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
          {props.itemList.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button variant="contained" color='secondary' onClick={() => editHandler(row.id, row.name)}>
                  Edit
                </Button>
                <Button variant="contained" color="warning" onClick={() => deleteHandler(row.id)}>
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
