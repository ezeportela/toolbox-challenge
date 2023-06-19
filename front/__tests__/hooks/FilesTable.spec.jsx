import { renderHook } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import _ from "lodash";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { useFilesTable } from "../../src/hooks/FilesTable";
import { config } from "../../src/lib/config";
import { SET_FILES_CONTENT, SET_FILES_LIST, store } from "../../src/store";
import { filesList, filesListContent } from "../mocks/files.mocks";

const mockDispatch = jest.fn();
const initialState = {
  loading: false,
  files: [],
  filesList: [],
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

const mock = new MockAdapter(axios);

function mockGet(path, response) {
  const { apiBaseUrl } = config;
  mock.onGet(`${apiBaseUrl}/${path}`).reply(200, response);
}

function mockGetFileContent(fileName = "") {
  mockGet(`files/data?fileName=${fileName}`, filesListContent);
}

test("FilesTable Hook", () => {
  const filename = _.first(filesList);

  useSelector
    .mockImplementation((state) => state)
    .mockReturnValue(initialState);

  mockGet("files/list", filesList);
  mockGetFileContent();
  mockGetFileContent(filename);

  const { result } = renderHook(() => useFilesTable(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  mockDispatch.mockImplementation((params) => {
    store.dispatch(params);
    const newState = store.getState();
    result.current = { ...result.current, ...newState };

    switch (params.type) {
      case SET_FILES_LIST:
        return expect(result.current.filesList).toStrictEqual(filesList);
      case SET_FILES_CONTENT:
        return expect(result.current.files).toStrictEqual(filesListContent);
    }
    return true;
  });

  result.current.onChangeFilesList({ target: { value: filename } });

  expect(result.current.filesList).toStrictEqual([]);
  expect(result.current.files).toStrictEqual([]);

  mock.reset();
});
