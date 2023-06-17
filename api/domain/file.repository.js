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
    return files.map(this.processFile, this).filter(checkIsNotEmpty)
  }

  processFile (fileMetadata) {
    const rows = fileMetadata
      .split('\n')
      .map((row) => row.split(','))
      .slice(1)

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
}

module.exports = FileRepository
