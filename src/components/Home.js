import React from "react";
import ResponsiveDrawer from "./ResponsiveDrawer";
import DataTable from "./DataTable";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { sidepanelActions } from "../store/sidepanel-slice";

const Home = (props) => {
  const [state, setState] = React.useState({
    left: false,
  });

  const dispatch = useDispatch();

  const operName = useSelector((state) => state.sidepanel.operName);

  const setAddProperties = () => {
    dispatch(sidepanelActions.setOperName("ADDITEM"));
    setState({ left: true });
  };

  return (
    <>
      <Button onClick={setAddProperties}>{"Add"}</Button>
      {operName === "ADDITEM" && (
        <ResponsiveDrawer state={state} setState={setState} />
      )}

      {operName === "EDITITEM" && (
        <ResponsiveDrawer state={state} setState={setState} />
      )}

      <DataTable setState={setState} />
    </>
  );
};

export default Home;
