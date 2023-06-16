const request = require("supertest");
const app = require("../application/app");
const { expect } = require("chai");
const sinon = require("sinon");
const _ = require("lodash");
const config = require("../domain/config");
const fs = require("fs");
const nock = require("nock");

async function testService(path, expectedStatus, expectedResponse) {
  const response = await request(app).get(path);

  expect(response.status).to.equals(expectedStatus);
  expect(response.body).to.deep.equal(expectedResponse);
}

const mockRequest = (
  pathname,
  responseData,
  statusCode = 200,
  method = "get",
  server = "http://localhost:8081"
) => nock(server)[method](pathname).query(true).reply(statusCode, responseData);

describe("controller", function () {
  let conf;

  this.beforeAll(() => {
    const now = new Date(Date.now());
    sinon.useFakeTimers(now);

    _.entries({
      API_BASE_URL: "https://echo-serv.tbxnet.com",
      API_SECRET_KEY: "test",
    }).forEach(([key, value]) => (process.env[key] = value));

    conf = config();
  });

  afterEach(() => {});

  it("should return status equals to true and the current timestamp", async () => {
    const timestamp = new Date().toISOString();
    await testService("/healthcheck", 200, {
      status: true,
      timestamp,
    });
  });

  it("should return a list of files", async () => {
    const expectedResponse = JSON.parse(
      fs.readFileSync("./test/mocks/get_files_ok_response.json")
    );

    nock(conf.apiBaseUrl, { reqheaders: { Authorization: "Bearer test" } })
      .get("/v1/secret/files")
      .reply(200, expectedResponse);

    await testService("/files/data", 200, {
      status: true,
      ...expectedResponse,
    });
  });
});
