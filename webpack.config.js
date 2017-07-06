const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pubpath = '/app2/';

module.exports = {
  
  entry: {
  	app:"./src/js/app.js",
  	vendor: ['react','react-dom','redux','react-redux','react-router-dom','react-router-redux']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: pubpath
  },

  module: {
    rules: [
      {
      	test: /\.(js|jsx)$/, 
      	loader: "babel-loader",
      	options: {
  		    presets: ["react","es2015","stage-0"]
  		  }
      },
      {
        test: /\.(jpg|png)$/, 
        loader: "url-loader",
        options: {
          limit:8192,
          name:'assets/img/[name]_[hash:8].[ext]',
          publicPath:pubpath
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, 
        loader: "url-loader",
        options: {
          limit:8192,
          name:'assets/font/[name]_[hash:8].[ext]',
          publicPath:pubpath
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: '[name]-[local]-[hash:base64:5]'
              }
          }, {
              loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      }
    ]
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production'),
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     names: ['vendor'],
    //     minChunks: Infinity,
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new ExtractTextPlugin("assets/css/styles.css")
  ],

  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    publicPath: '/app2/',
    compress: true,
    port: 8725,
    inline: true,
    hot:true,
    historyApiFallback: true,
    disableHostCheck: true
  }
};