module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@components': './src/components',
          '@utility': './src/utility',
          '@hooks': './src/hooks',
          '@api': './src/api',
          '@assets': './src/assets',
          '@redux': './src/redux',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
