// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
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
