const request = require('supertest')
const app = require('../application/app')
const { expect } = require('chai')
const fs = require('fs')
const nock = require('nock')
const pathjs = require('path')

async function testService (
  path,
  expectedStatus,
  expectedResponse,
  queryParams = {}
) {
  const response = await request(app).get(path).query(queryParams)

  expect(response.status).to.equals(expectedStatus)
  expect(response.body).to.deep.equal(expectedResponse)
}

function getMockFile (mockName) {
  return JSON.parse(fs.readFileSync(`./test/mocks/${mockName}.json`))
}

function mockGetRequest (url, token, path) {
  return nock(url, { reqheaders: { Authorization: `Bearer ${token}` } }).get(
    path
  )
}

function mockGetRequestWithFile (
  url,
  token,
  path,
  filename,
  expectedStatus = 200
) {
  mockGetRequest(url, token, path).replyWithFile(
    expectedStatus,
    pathjs.join(__dirname, 'mocks', filename)
  )
}

function mockGetRequestWithResponse (
  url,
  token,
  path,
  expectedResponse = {},
  expectedStatus = 200
) {
  mockGetRequest(url, token, path).reply(expectedStatus, expectedResponse)
}

module.exports = {
  testService,
  getMockFile,
  mockGetRequest,
  mockGetRequestWithFile,
  mockGetRequestWithResponse
}
