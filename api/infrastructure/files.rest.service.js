const config = require('../domain/config')
const { RestService } = require('./rest.service')

class FileRestService {
  constructor () {
    const { apiBaseUrl: url, apiSecretKey } = config
    this.url = url
    this.secret = apiSecretKey
  }

  getFiles () {
    const { url, secret } = this
    return new RestService({
      url,
      path: '/v1/secret/files',
      headers: {
        Authorization: `Bearer ${secret}`
      }
    }).request()
  }

  getFile (filename) {
    const { url, secret } = this
    return new RestService({
      url,
      path: '/v1/secret/file/:filename',
      params: { filename },
      headers: {
        Authorization: `Bearer ${secret}`
      }
    }).request()
  }
}

module.exports = FileRestService
