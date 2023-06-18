import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FileRestService } from "../lib/FileRestService";
import { setFilesList, setFilesContent, toggleLoading } from "../store";

export function useFilesTable() {
  const { files, filesList } = useSelector((state) => state);
  const dispatch = useDispatch();

  const fileRestService = new FileRestService();

  async function getFilesList() {
    const response = await fileRestService.getFilesList();
    dispatch(setFilesList(response.data));
  }

  async function getFilesContent() {
    dispatch(toggleLoading());
    const response = await fileRestService.getFilesContent();
    dispatch(setFilesContent(response.data));
    dispatch(toggleLoading());
  }

  useEffect(() => {
    getFilesList();
    getFilesContent();
  }, []);

  const columns = ["File Name", "Text", "Number", "Hex"];

  return { files, filesList, columns };
}
