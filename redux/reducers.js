import { combineReducers } from "redux";
import * as types from "./types";

// COUNTER REDUCER
const menuNavbarReducer = (state = true, { type }) => {
  switch (type) {
    case types.SHOW_NAV:
      return (state = true);
    case types.HIDE_NAV:
      return (state = false);
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  navbar: menuNavbarReducer,
};

export default combineReducers(reducers);
