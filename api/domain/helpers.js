const _ = require('lodash')

function checkIsNotEmpty (item) {
  return !_.isEmpty(item)
}

function checkInt (value) {
  return checkIsNotEmpty(value) && !_.isNaN(+value)
}

function stringParser (value) {
  return value
}

function intParser (value) {
  return parseInt(value)
}

function sortList (a, b) {
  const numA = Number(a.match(/\d+/))
  const numB = Number(b.match(/\d+/))

  const strA = a.replace(numA, '')
  const strB = b.replace(numB, '')
  const strComparison = strA.localeCompare(strB)

  if (strComparison === 0) {
    return numA - numB
  }

  return strComparison
}

module.exports = {
  checkIsNotEmpty,
  checkInt,
  stringParser,
  intParser,
  sortList
}
