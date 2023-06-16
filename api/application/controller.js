const FileRepository = require("../domain/file.repository");
const FileRestService = require("../infrastructure/files.rest.service");
const _ = require("lodash");

class AppController {
  healtcheck(req, res) {
    return res.json({
      status: true,
      timestamp: new Date().toISOString(),
    });
  }

  async getFiles(req, res) {
    try {
      const fileService = new FileRestService();
      const { data } = await fileService.getFiles();

      let promises = [];
      _.each(data.files, (file) => {
        promises = [
          ...promises,
          new Promise((resolve) =>
            fileService
              .getFile(file)
              .then((response) => resolve(response))
              .catch(() => resolve({}))
          ),
        ];
      });

      const responses = (await Promise.all(promises))
        .filter((response) => !_.isEmpty(response) && response.status === 200)
        .map((response) => {
          return response.data;
        });

      const fileRepository = new FileRepository();
      const files = fileRepository
        .processFiles(responses)
        .filter((file) => !_.isEmpty(file));

      return res.json(files);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = AppController;
