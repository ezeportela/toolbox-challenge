const FileRestService = require("../infrastructure/files.rest.service");

class AppController {
  healtcheck(req, res) {
    return res.json({
      status: true,
      timestamp: new Date().toISOString(),
    });
  }

  async getFiles(req, res) {
    try {
      const { data } = await new FileRestService().getFiles();
      return res.json({
        status: true,
        ...data,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = AppController;
