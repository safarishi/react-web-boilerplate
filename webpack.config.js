'use strict'

const path = require('path')
const webpack = require('webpack')
const Dashboard = require('webpack-dashboard')
// require webpack dashboard plugin
const DashboardPlugin = require('webpack-dashboard/plugin')
const autoprefixer = require('autoprefixer')
const precss = require('precss')

const TARGET = process.env.npm_lifecycle_event
process.env.BABEL_ENV = TARGET

const dashboard = new Dashboard

module.exports = {
  entry: [
    'babel-polyfill',
    './src/app.jsx',
  ],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new DashboardPlugin(dashboard.setData),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    host: '0.0.0.0',
    port: 9933,
  },
  resolve: {
    extensions: ['', '.web.js', '.js', '.json', '.jsx', '.less', '.css'],
    alias: {
      component: path.join(__dirname, 'src/components'),
      static: path.join(__dirname, 'src/statics'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules!postcss-loader',
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader?parser=postcss-less!less-loader',
      },
      {
        test: /\.(png|jpg)$/,
        include: path.join(__dirname, 'src'),
        loader: 'url-loader?limit=8192&name=../dist/images/[name].[ext]',
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'url-loader?limit=8192&name=../font/[name].[ext]',
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: '> 2%',
    }),
    precss,
  ]
}