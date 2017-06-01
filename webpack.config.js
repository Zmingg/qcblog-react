const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
  	app:"./src/js/app.js",
  	vendor: ['react','react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
      	test: /\.(js|jsx)$/, 
      	loader: "babel-loader",
      	options: {
		    presets: ["react","es2015"]
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
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ],
  devServer: {
    contentBase: './dist',
    // historyApiFallback:true,
    port: 8725,
    inline: true,
    disableHostCheck: true
  }
};