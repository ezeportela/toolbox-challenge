const FileRepository = require('../domain/file.repository')
const FileRestService = require('../infrastructure/files.rest.service')
const { sortList } = require('../domain/helpers')
const _ = require('lodash')

class AppController {
  constructor () {
    this.fileService = new FileRestService()
    this.fileRepository = new FileRepository()
  }

  healtcheck (req, res) {
    return res.json({
      status: true,
      timestamp: new Date().toISOString()
    })
  }

  async getFilesContent (req, res) {
    const filesList = await this.getFilesList()

    let promises = []
    _.each(filesList, (file) => {
      promises = [
        ...promises,
        new Promise((resolve) =>
          this.fileService
            .getFile(file)
            .then((response) => resolve(response))
            .catch(() => resolve({}))
        )
      ]
    })

    const responses = (await Promise.all(promises))
      .filter((response) => !_.isEmpty(response) && response.status === 200)
      .map((response) => {
        return response.data
      })

    const files = this.fileRepository.processFiles(responses)
    return res.json(files)
  }

  async getFilesList () {
    const { data } = await this.fileService.getFiles()
    return data.files.slice().sort(sortList)
  }
}

module.exports = AppController
