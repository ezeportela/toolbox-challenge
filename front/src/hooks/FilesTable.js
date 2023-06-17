import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FileRestService } from "../lib/FileRestService";
import { setFiles, toggleLoading } from "../store";

export function useFilesTable() {
  const { files } = useSelector((state) => state);
  const dispatch = useDispatch();

  async function getFiles() {
    dispatch(toggleLoading());
    const response = await new FileRestService().getFiles();
    dispatch(setFiles(response.data));
    dispatch(toggleLoading());
  }

  useEffect(() => {
    getFiles();
  }, []);

  return { files };
}
