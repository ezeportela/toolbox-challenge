const config = require("../domain/config");
const { RestService } = require("./rest.service");

class FileRestService {
  getFiles() {
    const { apiBaseUrl: url, apiSecretKey } = config();
    return new RestService({
      url,
      path: "/v1/secret/files",
      headers: {
        Authorization: `Bearer ${apiSecretKey}`,
      },
    }).request();
  }
}

module.exports = FileRestService;
