import { RestService } from "./RestService";
import { config } from "./config";

export class FileRestService {
  getFiles() {
    const { apiBaseUrl: url } = config;
    return new RestService({ url, path: "/files/data" }).request();
  }
}
