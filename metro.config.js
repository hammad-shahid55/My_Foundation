const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const config = getDefaultConfig(__dirname);
const { withNativeWind } = require("nativewind/metro");

module.exports = mergeConfig(config, withNativeWind(config, { input: "./global.css" }));