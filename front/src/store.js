import { configureStore } from "@reduxjs/toolkit";

const SET_FILES_LIST = "SET_FILES_LIST";
const SET_FILES_CONTENT = "SET_FILES_CONTENT";
const TOGGLE_LOADING = "TOGGLE_LOADING";

const initialState = {
  loading: false,
  filesList: [],
  files: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILES_LIST:
      return {
        ...state,
        filesList: action.payload,
      };
    case SET_FILES_CONTENT:
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

export const setFilesList = (payload) => {
  return {
    type: SET_FILES_LIST,
    payload,
  };
};

export const setFilesContent = (payload) => {
  return {
    type: SET_FILES_CONTENT,
    payload,
  };
};

export const toggleLoading = (payload) => {
  return {
    type: TOGGLE_LOADING,
  };
};

export const store = configureStore({ reducer: appReducer });
