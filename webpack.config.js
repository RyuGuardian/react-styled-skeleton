'use strict'

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProdBuild = argv.mode === 'production';

  return {
    entry: __dirname + '/app/app.js',

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },

    output: {
      filename: 'bundle.js',
      path: __dirname + '/build'
    },

    plugins: [
      new HTMLWebpackPlugin({
        template: __dirname + '/app/index.html',
        filename: 'index.html',
        inject: 'body'
      })
    ],

    devtool: isProdBuild ? false : 'inline-source-map'

  }
};
