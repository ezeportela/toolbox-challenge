const _ = require('lodash')

function checkIsNotEmpty (item) {
  return !_.isEmpty(item)
}

function checkInt (value) {
  return !_.isNaN(+value)
}

function stringParser (value) {
  return value
}

function intParser (value) {
  return parseInt(value)
}

module.exports = {
  checkIsNotEmpty,
  checkInt,
  stringParser,
  intParser
}
