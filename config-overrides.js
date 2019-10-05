module.exports = {
  webpack: function(config) {
    return {
      ...config,
      resolve: {
        alias: {
          react: "preact/compat",
          "react-dom": "preact/compat"
        }
      }
    };
  }
};
