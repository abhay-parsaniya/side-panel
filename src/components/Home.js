import React from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import DataTable from "./DataTable";
import Button from "@mui/material/Button";

const Home = (props) => {
  const [state, setState] = React.useState({
    left: false,
  });
  const [inputValue, setInputValue] = React.useState({
    id: null,
    name: "",
  });
  const [itemList, setItemList] = React.useState([]);
  const [operName, setOperName] = React.useState("");

  return (
    <>
      <Button onClick={() => {setOperName("ADDITEM"); setState({left: true})}}>{"Add"}</Button>
      {operName === "ADDITEM" && (
        <ResponsiveDrawer
          state={state}
          setState={setState}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setItemList={setItemList}
          operName={operName}
          setOperName={setOperName}
        />
      )}

      {operName === "EDITITEM" && (
        <ResponsiveDrawer
          state={state}
          setState={setState}
          inputValue={inputValue}
          setInputValue={setInputValue}
          itemList={itemList}
          setItemList={setItemList}
          operName={operName}
          setOperName={setOperName}
        />
      )}

      <DataTable
        setState={setState}
        setInputValue={setInputValue}
        itemList={itemList}
        setItemList={setItemList}
        setOperName={setOperName}
      />
    </>
  );
};

export default Home;
