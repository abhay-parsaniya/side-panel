import { createSlice } from "@reduxjs/toolkit";

const sidepanelSlice = createSlice({
  name: "sidepanel",
  initialState: {
    inputValue: {
      id: null,
      name: "",
    },
    itemList: [],
    operName: "",
  },
  reducers: {
    setOperName(state, action) {
      state.operName = `${action.payload}`;
    },
    setItemList(state, action) {
      state.itemList.push(action.payload);
    },
    setInputValue(state, action) {
      state.inputValue = { id: action.payload.id, name: action.payload.name };
    },
    replaceItemList(state, action) {
      state.itemList = action.payload;
    },
  },
});

export const sidepanelActions = sidepanelSlice.actions;

export default sidepanelSlice;
