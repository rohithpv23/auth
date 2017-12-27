const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'style.css',
});

module.exports = {
  stats: {
    colors: true,
  },
  cache: true,
  entry: {
    main: path.join(__dirname, '/public/src/main.js'),
  },
  devtool: 'source-map',
  output: {
    path: path.resolve('./public/dist/'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name]-[id].js',
  },
  resolve: {
    alias: {
      public: path.join(__dirname, 'public'),
    },
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
              loader: "style-loader"
            }, {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputStyle: 'compact',
            },
          }],
        }),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
          ],
        },
      },
    ],
  },
};
