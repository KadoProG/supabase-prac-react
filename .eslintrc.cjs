module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-hooks', '@typescript-eslint', 'react', 'etc', 'node'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-console': 'warn',
    'no-extra-semi': 'warn',
    // TypeScriptは@typescriptで実行する
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    // 全角空白の禁止 これは一旦OFF
    'no-irregular-whitespace': ['off'],
    'no-undef': 'off',
    'react/prop-types': 'off',
    quotes: ['warn', 'single'],
    'space-before-blocks': ['warn', { functions: 'always' }],
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
    'react/react-in-jsx-scope': 'off',
    // if文でreturn書くならelseいらない
    'no-else-return': ['error'],
    // 相対importの禁止
    'no-restricted-imports': ['warn', { patterns: ['./', '../'] }],
    // 余計な<></>が入っていないか確認する
    'react/jsx-no-useless-fragment': ['warn'],
    // () => {return <></>}ではなく、()=> <></>と表記するように
    'arrow-body-style': ['error'],
    // importは一番最初に書くように
    // 'import/first': 'error',
    // 比較演算子の"=="を”＝＝＝”に修正する
    eqeqeq: 2,
    // switch文のbreakチェック
    'no-fallthrough': 'error',
    // 変数に{""}ではなく""で入力させる
    'react/jsx-curly-brace-presence': ['error'],
    'import/prefer-default-export': ['off'],
  },
};
