const webpack = require('webpack');

module.exports = {
  "stories": ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-webpack5-compiler-babel"
  ],
  "framework": {
    name: "@storybook/html-webpack5",
    options: {},
  },
  staticDirs: ["./public"],
  webpackFinal: async config => {
    config.devtool = false;
    config.plugins.push(new webpack.SourceMapDevToolPlugin({
      append: '\n//# sourceMappingURL=[url]',
      fileContext: './',
      filename: '[file].map'
    }));
    return config;
  },
};