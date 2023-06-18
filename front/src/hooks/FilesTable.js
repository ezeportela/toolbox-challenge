import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FileRestService } from "../lib/FileRestService";
import { setFilesList, setFilesContent, toggleLoading } from "../store";

export function useFilesTable() {
  const { files, filesList, loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  const fileRestService = new FileRestService();

  async function getFilesList() {
    const response = await fileRestService.getFilesList();
    dispatch(setFilesList(response.data));
  }

  async function getFilesContent(fileName = "") {
    dispatch(toggleLoading());
    const response = await fileRestService.getFilesContent(fileName);
    dispatch(setFilesContent(response.data));
    dispatch(toggleLoading());
  }

  function onChangeFilesList({ target }) {
    getFilesContent(target.value);
  }

  useEffect(() => {
    getFilesList();
    getFilesContent();
  }, []);

  const columns = ["File Name", "Text", "Number", "Hex"];

  return { files, filesList, loading, columns, onChangeFilesList };
}
