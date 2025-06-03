// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 1) Plugin de react-native-dotenv
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      // 2) Plugin de module-resolver
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
          alias: {
            '@config': './src/config',
            '@context': './src/context',
            '@hooks': './src/hooks',
            '@features':  './src/features',
            '@components': './src/components',
            '@assets': './src/assets',
            '@styles': './src/styles',
          },
        },
      ],
    ],
  };
};
