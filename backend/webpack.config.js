const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

let nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

//
// LOADERS
//

const loaders = {};

loaders.tslint = {
  test: /\.(tsx?)$/,
  enforce: 'pre',
  loader: 'tslint-loader',
  options: {/* Loader options go here */}
};

loaders.tsx = {
  test: /\.(tsx?)$/,
  use: [
    {
      loader: 'ts-loader',
      options: {}
    }
  ],
  exclude: /node_modules/
};

//
// PLUGINS
//

const sourceMap = (process.env.TEST || process.env.NODE_ENV !== 'production')
  ? [new webpack.SourceMapDevToolPlugin({filename: null, test: /\.tsx?$/})]
  : [];

const basePlugins = [
  new webpack.NoEmitOnErrorsPlugin()
].concat(sourceMap);

const devPlugins = [
  new webpack.HotModuleReplacementPlugin()
];

const prodPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  })
];

const plugins = basePlugins
  .concat(IS_PRODUCTION ? prodPlugins : devPlugins);

//
// ENTRY
//

const applicationEntries = ['./src/index'];

let devtool = 'inline-source-map';

if (IS_PRODUCTION) {
  devtool = 'source-map';
}

module.exports = {
  entry: applicationEntries,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  devtool: devtool,

  resolve: {
    modules: [
      path.resolve('./'),
      'node_modules'
    ],
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      '.json'
    ]
  },

  plugins: plugins,

  devServer: {
    historyApiFallback: {index: '/'}
  },

  module: {
    rules: [
      loaders.tsx,
      loaders.tslint
    ]
  },
  externals: nodeModules
};
