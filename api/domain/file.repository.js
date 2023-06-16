const _ = require("lodash");

class FileRepository {
  columns = ["file", "text", "number", "hex"];

  processFiles(files) {
    return files.map(this.processFile, this);
  }

  checkIsNotEmpty(item) {
    return !_.isEmpty(item);
  }

  validateFileRow(row) {
    if (_.isEqual(row, this.columns) || row.length !== this.columns.length) {
      return false;
    }

    return _.every(row, this.checkIsNotEmpty);
  }

  parseFileRow(row) {
    return row
      .map((item, index) => ({ [this.columns[index]]: item }))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {});
  }

  processFile(fileMetadata) {
    const rows = fileMetadata
      .replaceAll()
      .split("\n")
      .map((row) => row.split(","));

    const fileLines = rows
      .map(
        (row) => (this.validateFileRow(row) ? this.parseFileRow(row) : null),
        this
      )
      .filter(this.checkIsNotEmpty);

    if (_.isEmpty(fileLines)) return {};

    const file = _.first(fileLines).file;
    const lines = fileLines.map((line) =>
      _.omit(line, [_.first(this.columns)])
    );

    return {
      file,
      lines,
    };
  }
}

module.exports = FileRepository;
