import React from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import DataTable from "./DataTable";

const Home = () => {
  const [state, setState] = React.useState({
    left: false,
  });
  const [inputValue, setInputValue] = React.useState({
    id: null,
    name: "",
  });
  const [itemList, setItemList] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);

  return (
    <>
      <ResponsiveDrawer
        state={state}
        setState={setState}
        inputValue={inputValue}
        setInputValue={setInputValue}
        itemList={itemList}
        setItemList={setItemList}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      />
      <DataTable
        setState={setState}
        inputValue={inputValue}
        setInputValue={setInputValue}
        itemList={itemList}
        setItemList={setItemList}
        setIsEdit={setIsEdit}
      />
    </>
  );
};

export default Home;
