const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {

  output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    })

  ],

  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 8725,
    inline: true,
    hot:true,
    disableHostCheck: true
  }
});