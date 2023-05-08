module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'import',
  ],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js', '**/*.spec.js', 'test/**/*', 'tests/**/*', 'spec/**/*'],
      }, 
    ], 
  }, 
};
