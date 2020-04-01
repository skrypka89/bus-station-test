module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'jest'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  env: {
    node: true,
    es2017: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-dupe-class-members': 0,

    'no-use-before-define': ['error', { functions: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    camelcase: ['error', { properties: 'always' }],
    'max-len': ['error', { code: 120 }],
    'lines-between-class-members': 0,
    'no-await-in-loop': 0,
    'consistent-return': 0,
    'default-case': 0,
    'no-prototype-builtins': 0,
    'prefer-template': 0,
    'class-methods-use-this': 0,
    'arrow-body-style': 0,
    'object-curly-newline': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        mjs: 'never',
      },
    ],
    'no-underscore-dangle': 0,
    'no-param-reassign': ['error', { props: false }],
  },
  overrides: [
    {
      files: '*.js',
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
};
