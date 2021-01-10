module.exports = {
  moduleDirectories: ['<rootDir>', 'node_modules'],
  moduleNameMapper: {
    '^@modules/(.*)$': 'src/modules/$1',
    '^@shared/(.*)$': 'src/shared/$1',
  },
  globalSetup: '<rootDir>/jest.globalSetup.js',
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
      packageJson: 'package.json',
    },
  },
};
