import axios from "axios";
import _ from "lodash";

export const GET = "get";

export class RestService {
  /**
   *
   * @param {string} method
   * @param {string} url
   * @param {string} path
   * @param {object} params
   * @param {object} headers
   * @returns {RestService}
   */
  constructor({ method = GET, url, path, queryParams = {}, headers }) {
    let uri = url + path;

    const query = _.entries(queryParams)
      .map(([key, value]) => [key, value].join("="))
      .join("&");
    if (!_.isEmpty(query)) uri += ["?", query].join("");

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

    const response = await axios({
      method,
      url,
      headers,
    });

    return response;
  }
}
