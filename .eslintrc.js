module.exports = {
  root: true,
  extends: '@react-native',
  settings: {
    'import/resolver': {
      'babel-module': {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '^@/(.+)': './src/\\1',
        },
      },
    },
  },
};
