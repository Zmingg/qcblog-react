const webpack = require('webpack');
const path = require('path');

module.exports = {
  
  entry: {
  	app:"./src/js/app.js",
  	vendor: ['react','react-dom','redux','react-redux','react-router-dom','react-router-redux']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath:'/'
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
        test: /\.css$/,
        use:[
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.(jpg|png)$/, 
        loader: "url-loader",
        options: {
          limit:8192,
          name:'img/[name]_[hash:8].[ext]',
          publicPath:'/'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, 
        loader: "url-loader",
        options: {
          limit:8192,
          name:'font/[name]_[hash:8].[ext]',
          publicPath:'/'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {loader: "style-loader" }, 
          {
            loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]'
            }
          }, 
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
        minChunks: Infinity,
    }),

  ],

  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 8725,
    inline: true,
    hot:true,
    disableHostCheck: true
  }
};