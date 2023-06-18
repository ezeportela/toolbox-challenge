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
const { sortList } = require('../domain/helpers')

describe('controller', function () {
  const { apiBaseUrl: url, apiSecretKey: apiKey } = config

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
    const expectedResponse = getMockFile('get_files_ok_response')

    mockGetRequestWithResponse(
      url,
      apiKey,
      '/v1/secret/files',
      expectedResponse
    )

    const expected = expectedResponse.files.slice().sort(sortList)
    await testService('/files/list', 200, expected)
  })

  it('should return a list of files with content', async () => {
    mockGetRequestWithFile(
      url,
      apiKey,
      '/v1/secret/files',
      'get_files_ok_response.json'
    )

    const testData = getMockFile('get_file_test_responses')

    _.each(testData, (data) => {
      const { filename, status, content } = data
      const path = `/v1/secret/file/${filename}.csv`
      mockGetRequestWithResponse(url, apiKey, path, content, status)
    })

    const expected = getMockFile('get_files_data_response')
    await testService('/files/data', 200, expected)
  })

  it('should return a list of files with content filtering by fileName', async () => {
    mockGetRequestWithFile(
      url,
      apiKey,
      '/v1/secret/files',
      'get_files_ok_response.json'
    )

    const testData = _.first(getMockFile('get_file_test_responses'))
    const { filename, status, content } = testData
    const fileName = `${filename}.csv`
    const path = `/v1/secret/file/${fileName}`
    mockGetRequestWithResponse(url, apiKey, path, content, status)

    const expected = _.first(getMockFile('get_files_data_response'))
    await testService('/files/data', 200, [expected], { fileName })
  })
})
