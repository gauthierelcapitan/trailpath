/* eslint-disable */
export default {
  displayName: 'api',
  preset: '../../../jest.preset.js',
  rootDir: ".",
  moduleNameMapper: {
    "^@trailpath/api/(.*)$": "<rootDir>/../src/$1",
    "^@trailpath/api-interface/(.*)$": "<rootDir>/../../libs/api-interface/src/index.ts",
    "^@trailpath/gpx-distance/(.*)$": "<rootDir>/../../libs/gpx-distance/src/index.ts",
    "^@trailpath/gpx-resample/(.*)$": "<rootDir>/../../libs/gpx-distance/src/index.ts",
    "^@trailpath/gpx-track/(.*)$": "<rootDir>/../../libs/gpx-distance/src/index.ts",
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  testMatch: ["<rootDir>/**/*.e2e-spec.{ts,js}"],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: '../../coverage/apps/api',
}
