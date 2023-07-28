module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    plugins: ['prettier', '@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    parser: '@typescript-eslint/parser',

    env: {
        browser: true,
        es6: true,
        node: true,
    },
    rules: {
        'prettier/prettier': 'error',
        // Add any other custom rules or overrides here
    },
};
