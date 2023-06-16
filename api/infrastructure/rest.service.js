const axios = require("axios");
const _ = require("lodash");

const GET = "get";

class RestService {
  /**
   *
   * @param {string} method
   * @param {string} url
   * @param {string} path
   * @param {object} params
   * @param {object} headers
   * @returns {RestService}
   */
  constructor({ method = GET, url, path, params = {}, headers }) {
    let uri = url + path;
    _.entries(params).forEach(([key, value]) => {
      uri = uri.replace(`:${key}`, value);
    });

    this.url = uri;

    this.method = method;
    this.headers = headers;
  }

  /**
   *
   * @returns {Promise<any>} AxiosResponse
   */
  async request() {
    const { method, url, headers } = this;

    try {
      const response = await axios({
        method,
        url,
        headers,
      });

      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  RestService,
  GET,
};
