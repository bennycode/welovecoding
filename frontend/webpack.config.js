const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

//
// LOADERS
//

const loaders = {};

loaders.tslint = {
  test: /\.(tsx?)$/,
  enforce: 'pre',
  loader: 'tslint-loader',
  options: {
    configFile: path.resolve('../tslint.json')
  }
};

loaders.tsx = {
  test: /\.(tsx?)$/,
  use: [
    'react-hot-loader/webpack',
    {
      loader: 'ts-loader',
      options: {}
    }
  ],
  exclude: /node_modules/
};

const extractSass = new ExtractTextPlugin({
  filename: 'style.css',
  allChunks: true,
  disable: !IS_PRODUCTION
});

loaders.scss = {
  test: /\.scss$/,
  use: extractSass.extract({
    use: [{
      loader: "css-loader"
    }, {
      loader: "sass-loader"
    }],
    // use style-loader in development
    fallback: "style-loader"
  })
};

loaders.ttfeot = {
  test: /\.(ttf|eot)$/i,
  use: [{
    loader: 'file-loader',
    options: {
      hash: 'sha512',
      digest: 'hex',
      name: 'fonts/[name].[ext]?[hash]'
    }
  }]
};

loaders.woff = {
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 10000,
      minetype: 'application/font-woff',
      name: 'fonts/[name].[ext]?[hash]'
    }
  }]
};

loaders.image = {
  test: /\.(jpe?g|png|gif)$/i,
  use: [{
    loader: 'file-loader',
    options: {
      hash: 'sha512',
      digest: 'hex',
      name: 'images/[name]-[hash].[ext]'
    }
  }]
};

//
// PLUGINS
//

const sourceMap = (process.env.TEST || process.env.NODE_ENV !== 'production')
  ? [new webpack.SourceMapDevToolPlugin({filename: null, test: /\.tsx?$/})]
  : [];

const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      __DEV__: process.env.NODE_ENV !== 'production',
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      BACKEND_URL: JSON.stringify(process.env.BACKEND_URL || 'http://localhost:8080')
    }
  }),
  new HtmlWebpackPlugin({
    template: './index.html',
    inject: 'body'
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new CopyWebpackPlugin([
    {from: 'assets', to: 'assets'}
  ]),
  extractSass
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

const applicationEntries = IS_PRODUCTION ? ['./src/index'] : [
  'react-hot-loader/patch',
  './src/index'
];

let devtool = 'inline-source-map';

if (IS_PRODUCTION) {
  devtool = 'source-map';
}

module.exports = {
  entry: applicationEntries,

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js'
  },

  devtool: devtool,

  resolve: {
    modules: [
      path.resolve('./'),
      'node_modules'
    ],
    extensions: [
      '.scss',
      '.tsx',
      '.ts',
      '.js',
      '.json'
    ]
  },

  plugins: plugins,

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: {colors: true},
    port: 8081,
    proxy: {
      '/rest': 'http://localhost:8080'
    }
  },

  module: {
    rules: [
      loaders.scss,
      loaders.tsx,
      loaders.tslint,
      loaders.image,
      loaders.ttfeot,
      loaders.woff
    ]
  }
};
