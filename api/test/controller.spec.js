const request = require("supertest");
const app = require("../application/app");
const { expect } = require("chai");
const sinon = require("sinon");
const config = require("../domain/config");
const fs = require("fs");
const nock = require("nock");
const _ = require("lodash");

async function testService(path, expectedStatus, expectedResponse) {
  const response = await request(app).get(path);

  expect(response.status).to.equals(expectedStatus);
  expect(response.body).to.deep.equal(expectedResponse);
}

function getMockFile(mockName) {
  return JSON.parse(fs.readFileSync(`./test/mocks/${mockName}.json`));
}

function mockGetRequest(url, token, path) {
  return nock(url, { reqheaders: { Authorization: `Bearer ${token}` } }).get(
    path
  );
}

function mockGetRequestWithFile(
  url,
  token,
  path,
  filename,
  expectedStatus = 200
) {
  mockGetRequest(url, token, path).replyWithFile(
    expectedStatus,
    `${__dirname}/mocks/${filename}`
  );
}

function mockGetRequestWithResponse(
  url,
  token,
  path,
  expectedResponse = {},
  expectedStatus = 200
) {
  mockGetRequest(url, token, path).reply(expectedStatus, expectedResponse);
}

describe("controller", function () {
  this.beforeAll(() => {
    const now = new Date(Date.now());
    sinon.useFakeTimers(now);
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
    const apiFilesResponse = getMockFile("get_files_ok_response");
    const { apiBaseUrl, apiSecretKey } = config;

    mockGetRequestWithFile(
      apiBaseUrl,
      apiSecretKey,
      "/v1/secret/files",
      "get_files_ok_response.json"
    );

    const testData = getMockFile("get_file_test_responses");

    _.each(testData, (data) => {
      const { filename, status, content } = data;
      const path = `/v1/secret/file/${filename}.csv`;
      mockGetRequestWithResponse(
        apiBaseUrl,
        apiSecretKey,
        path,
        content,
        status
      );
    });

    const expected = getMockFile("get_files_data_response");
    await testService("/files/data", 200, expected);
  });
});
