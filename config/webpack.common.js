const webpack = require('webpack');
const path = require('path');
const pubpath = '/';
module.exports = {
  
  entry: {
  	app:"./src/js/app.js",
  	vendor: ['react','react-dom','redux','react-redux','react-router-dom','react-router-redux']
  },

  resolve: {
    alias: {
      Components: path.resolve(__dirname, '../src/js/components/'),
    },

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
        test: /\.css$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader",
            options: {
                modules: true,
                localIdentName: '[name]-[local]-[hash:base64:5]'
            }
        }, {
            loader: "sass-loader"
        }]
      }
    ]
  }

};