import { RestService } from "./RestService";
import { config } from "./config";

export class FileRestService {
  constructor() {
    const { apiBaseUrl: url } = config;
    this.url = url;
  }

  getFilesList() {
    return new RestService({ url: this.url, path: "/files/list" }).request();
  }

  getFilesContent() {
    return new RestService({ url: this.url, path: "/files/data" }).request();
  }
}
