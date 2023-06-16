/* globals describe, it */
const sinon = require('sinon')
const config = require('../domain/config')
const _ = require('lodash')
const {
  testService,
  getMockFile,
  mockGetRequestWithFile,
  mockGetRequestWithResponse
} = require('./helpers')

describe('controller', function () {
  this.beforeAll(() => {
    const now = new Date(Date.now())
    sinon.useFakeTimers(now)
  })

  it('should return status equals to true and the current timestamp', async () => {
    const timestamp = new Date().toISOString()
    await testService('/healthcheck', 200, {
      status: true,
      timestamp
    })
  })

  it('should return a list of files', async () => {
    const { apiBaseUrl, apiSecretKey } = config

    mockGetRequestWithFile(
      apiBaseUrl,
      apiSecretKey,
      '/v1/secret/files',
      'get_files_ok_response.json'
    )

    const testData = getMockFile('get_file_test_responses')

    _.each(testData, (data) => {
      const { filename, status, content } = data
      const path = `/v1/secret/file/${filename}.csv`
      mockGetRequestWithResponse(
        apiBaseUrl,
        apiSecretKey,
        path,
        content,
        status
      )
    })

    const expected = getMockFile('get_files_data_response')
    await testService('/files/data', 200, expected)
  })
})
