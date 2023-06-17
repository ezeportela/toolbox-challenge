const _ = require('lodash')
const {
  checkIsNotEmpty,
  checkInt,
  stringParser,
  intParser
} = require('./helpers')

class FileRepository {
  cols = [
    {
      name: 'file',
      validation: checkIsNotEmpty,
      parser: stringParser
    },
    {
      name: 'lines[{i}].text',
      validation: checkIsNotEmpty,
      parser: stringParser
    },
    {
      name: 'lines[{i}].number',
      validation: checkInt,
      parser: intParser
    },
    {
      name: 'lines[{i}].hex',
      validation: checkIsNotEmpty,
      parser: stringParser
    }
  ]

  columns = ['file', 'text', 'number', 'hex']

  processFiles (files) {
    const unorderedFiles = files
      .slice(1)
      .map(this.processFile, this)
      .filter((file) => !_.isEmpty(file))
    return unorderedFiles.slice().sort(this.sortFileList.bind(this))
  }

  processFile (fileMetadata) {
    const rows = fileMetadata.split('\n').map((row) => row.split(','))

    const lines = rows
      .filter((row) => this.validateFileRow(row), this)
      .map((row, idx) => this.parseFileRow(idx, row), this)
      .reduce((prev, curr) => _.merge(prev, curr), {})

    return lines
  }

  validateFileRow (row) {
    if (_.isEqual(row, this.columns) || row.length !== this.cols.length) {
      return false
    }

    return _.every(this.cols, (col, idx) => col.validation(row[idx]))
  }

  parseFileRow (rowIdx, row) {
    return row
      .map((item, idx) => {
        const col = this.cols[idx]

        const obj = {}
        _.set(obj, col.name.replace('{i}', rowIdx), col.parser(item))
        return obj
      })
      .reduce((prev, curr) => _.merge(prev, curr), {})
  }

  sortFileList (a, b) {
    const col = _.first(this.columns)
    const fileA = _.get(a, col)
    const fileB = _.get(b, col)

    const numA = Number(fileA.match(/\d+/))
    const numB = Number(fileB.match(/\d+/))

    const strA = fileA.replace(numA, '')
    const strB = fileB.replace(numB, '')
    const strComparison = strA.localeCompare(strB)

    if (strComparison === 0) {
      return numA - numB
    }

    return strComparison
  }
}

module.exports = FileRepository
