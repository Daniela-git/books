const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './web/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  target: 'web',
  externals: [nodeExternals()],
  plugins: [
    new webpack.ProvidePlugin({
      require: 'require',
    }),
  ],
};
