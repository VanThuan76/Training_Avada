const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: { ...config.alias, "@avada": path.resolve(__dirname, "src") },
  };

  return config;
};
