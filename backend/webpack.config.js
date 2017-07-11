const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const _ = require('lodash');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

let nodeModules = [];

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(module) {
    nodeModules[module] = `require('${module}')`;
  });

fs.readdirSync('../node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(module) {
    nodeModules[module] = `require('${module}')`;
  });

module.exports = {
  entry: {
    main: './src/index',
    populate_database: './src/commands/populate_database',
    reset_database: './src/commands/reset_database',
  },
  target: 'node',
  externals: nodeModules,
  devtool: 'source-map',
  devServer: {
    historyApiFallback: { index: '/' }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: [path.resolve('./'), 'node_modules'],
    extensions: [
      '.ts',
      '.js',
      '.json'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
        options: {
          configFile: path.resolve('../tslint.json')
        }
      },
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {}
      }
    ]
  },
  plugins: _.compact([
    new webpack.NoEmitOnErrorsPlugin(),
    !IS_PRODUCTION && new webpack.HotModuleReplacementPlugin(),
    IS_PRODUCTION && new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]),
};
