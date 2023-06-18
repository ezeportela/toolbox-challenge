module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testMatch: ["<rootDir>/__tests__/**/*.spec.jsx"],
  collectCoverage: true,
  coverageReporters: ["html", "text-summary"],
};
