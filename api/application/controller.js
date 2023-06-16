class AppController {
  healtcheck(req, res) {
    return res.json({
      status: true,
      timestamp: new Date().toISOString(),
    });
  }

  getFiles() {
    return res.json({
      status: true,
    });
  }
}

module.exports = AppController;
