import { configureStore } from "@reduxjs/toolkit";

const SET_FILES = "SET_FILES";
const TOGGLE_LOADING = "TOGGLE_LOADING";

const initialState = {
  loading: false,
  files: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
};

export const setFiles = (payload) => {
  return {
    type: SET_FILES,
    payload,
  };
};

export const toggleLoading = (payload) => {
  return {
    type: TOGGLE_LOADING,
  };
};

export const store = configureStore({ reducer: appReducer });
