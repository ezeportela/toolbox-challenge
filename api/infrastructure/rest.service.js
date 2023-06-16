const axios = require("axios");
const _ = require("lodash");

const GET = "get";
const POST = "post";

class RestService {
  /**
   *
   * @param {string} method
   * @param {string} url
   * @param {string} path
   * @param {object} data
   * @param {object} params
   * @param {object} query
   * @param {object} headers
   * @returns {RestService}
   */
  constructor({
    method = GET,
    url = "",
    path = "/",
    data = {},
    params = {},
    query = {},
    headers = {},
  }) {
    let uri = url + path;
    if (!_.isEmpty(query)) {
      const queryParams = Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join("&");
      uri += `?${queryParams}`;
    }

    _.entries(params).forEach(([key, value]) => {
      uri = uri.replace(`:${key}`, value);
    });

    this.url = uri;

    this.method = method;
    this.data = data;
    this.headers = headers;
  }

  getBodyType() {
    return this.method === GET ? "params" : "data";
  }

  /**
   *
   * @returns {Promise<any>} AxiosResponse
   */
  async request() {
    const { method, url, data = {}, headers = {} } = this;

    try {
      const response = await axios({
        method,
        url,
        [this.getBodyType()]: data,
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
  POST,
};
