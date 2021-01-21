module.exports = {
  moduleDirectories: ['<rootDir>', 'node_modules'],
  moduleNameMapper: {
    '^@module/(.*)$': 'src/module/$1/public.ts',
    '^@private/(.*)$': 'src/module/$1/private/index.ts',
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
