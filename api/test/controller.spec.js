const request = require("supertest");
const app = require("../application/app");
const chai = require("chai");
const sinon = require("sinon");

const expect = chai.expect;

async function testService(path, expectedStatus, expectedResponse) {
  const response = await request(app).get(path);

  expect(response.status).to.equals(expectedStatus);
  expect(response.body).to.deep.equal(expectedResponse);
}

describe("controller", function () {
  this.beforeAll(() => {
    const now = new Date(Date.now());
    sinon.useFakeTimers(now);
  });

  it("should return status equals to true and the current timestamp", () => {
    const timestamp = new Date().toISOString();
    testService("/healthcheck", 200, {
      status: true,
      timestamp,
    });
  });

  it("should return a list of files", () => {
    testService("/files/data", 200, {
      status: true,
    });
  });
});
