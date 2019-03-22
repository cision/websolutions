// webpack v4
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },
  externals: {
    jquery: 'jQuery',
    Highcharts: 'highcharts'
  },
  entry: ['./src/cision.index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cision.bundle.js'
  },
  devtool: '', // inline-source-map // add for debug purposes
  devServer: {
    contentBase: './dist',
    hot: true,
    open: true,
    index: 'index.html',
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        // only include files present in the `src` subdirectory
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [  ["@babel/env", {
              "useBuiltIns": "usage",
              "targets": {
                  "browsers": [
                      "chrome >= 61",
                      "edge >= 15",
                      "firefox >= 52",
                      "ie >= 10",
                  ]
              }
          }]]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      {
        test: require.resolve('moment'),
        use: [{
          loader: 'expose-loader',
          options: 'moment'
        }]
      },
    ]
  },
  plugins: [
   // new BundleAnalyzerPlugin({generateStatsFile: false }),
    new BrotliGzipPlugin({
      asset: '[path].br[query]',
      algorithm: 'brotli',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      quality: 11
  }),
  new BrotliGzipPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
  }),
  new webpack.IgnorePlugin({ // tell webpack not to load moment locales except for the stated languages to minimize payload
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/
  }), 
    new ExtractTextPlugin('style.css'),
    new CleanWebpackPlugin('dist', {}),
    new webpack.ProvidePlugin({
      moment: "moment",
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/insiders.html',
      filename: 'insiders.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/calendar.html',
      filename: 'calendar.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/calendarEvent.html',
      filename: 'calendarEvent.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/mediafeed.html',
      filename: 'mediafeed.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/orderbook.html',
      filename: 'orderbook.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/ownership.html',
      filename: 'ownership.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/estimatePackage1.html',
      filename: 'estimatePackage1.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/estimatePackage2.html',
      filename: 'estimatePackage2.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/estimatePackage3.html',
      filename: 'estimatePackage3.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/performance.html',
      filename: 'performance.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/printedMaterial.html',
      filename: 'printedMaterial.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/newsfeed.html',
      filename: 'newsfeed.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/releaseDetail.html',
      filename: 'releaseDetail.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/shareCalculator.html',
      filename: 'shareCalculator.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/sharegraphSmall.html',
      filename: 'sharegraphSmall.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/sharegraph.html',
      filename: 'sharegraph.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/tickerLarge.html',
      filename: 'tickerLarge.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/tickerSmall.html',
      filename: 'tickerSmall.html'
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/trades.html',
      filename: 'trades.html'
    }),
  ]
};
