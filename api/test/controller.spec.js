const request = require("supertest");
const app = require("../application/app");
const chai = require("chai");
const sinon = require("sinon");

const expect = chai.expect;

describe("controller", function () {
  this.beforeAll(() => {
    const now = new Date(Date.now());
    sinon.useFakeTimers(now);
  });

  it("should return status equals to true and the current timestamp", async function () {
    const timestamp = new Date().toISOString();
    const response = await request(app).get("/healthcheck");
    expect(response.status).to.equals(200);

    expect(response.body).to.deep.equal({
      status: true,
      timestamp,
    });
  });
});
