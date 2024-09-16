const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Add .mid files to asset extensions
  config.resolver.assetExts.push('mid');

  return config;
})();
