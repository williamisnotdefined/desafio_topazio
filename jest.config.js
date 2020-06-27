const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: [
      '<rootDir>/src/modules/**/services/*.ts'
  ],

  coverageDirectory: '<rootDir>/src/__tests__/coverage',

  coverageReporters: [
    "text-summary",
    "lcov"
  ],
   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
       prefix: '<rootDir>/src/'
   }),
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    //"**/*.spec.ts"
    '<rootDir>/src/__tests__/**/*.test.ts'
  ],
  testTimeout: 30000
};
