const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { apikey } = require('./credentials.json')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/index.html',
      publicPath: '',
      apikey: apikey
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/public', to: '' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
      chunkFilename: pathData => {
        return pathData.chunk.name ? 'css/[name].css' : 'css/lazy/[id].css';
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '...']
  },
  module: {
    rules: [
      {
        test: /\.(png|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(j|t)sx?$/i,
        exclude: /[\\/]node_modules[\\/]/,
        use: ['ts-loader'],
      }
    ]
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    }
  }
};