const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Alias para que Metro resuelva igual que Babel
config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname, 'src'),
  '@assets': path.resolve(__dirname, 'src/assets'),
};
config.watchFolders = [path.resolve(__dirname, 'src')];

// Mantén tu lógica de exports condicionales
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = [
  'browser',
  'react-native',
  'require',
];

module.exports = config;
