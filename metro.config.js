// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // ✨ 1) Transforma .svg a componente React Native
  config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
  // Quita svg de assetExts y añádelo a sourceExts
  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
  config.resolver.sourceExts.push('svg');

  // 🔗 2) Tus alias
  config.resolver.extraNodeModules = {
    '@': path.resolve(__dirname, 'src'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    // … si tienes más alias
  };
  config.watchFolders = [path.resolve(__dirname, 'src')];

  // 📦 3) Mantén tu lógica de exports condicionales si la necesitas
  config.resolver.unstable_enablePackageExports = true;
  config.resolver.unstable_conditionNames = ['browser','react-native','require'];

  return config;
})();
