var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    inline: true,
    progress: true,
    contentBase: __dirname + "/app",
    port: 8080
  },

  entry: __dirname + '/app/index.js',

  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: './bundle.js'
  },

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' },
      { from: './app/routes.js', to: 'routes.js' },
      { from: './app/css', to: 'css' },
      { from: './app/fonts', to: 'fonts' }
    ])
  ]
};