module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        "import/no-anonymous-default-export": "off",
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-types': 'warn',
    },
    settings: {
        react: {
            version: 'latest',
        },
    },
};
