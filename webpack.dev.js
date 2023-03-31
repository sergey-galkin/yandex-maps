const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { apikey } = require('./credentials.json')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: 'js/[name].js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/public'),
      publicPath: '/',
    },
    historyApiFallback: true,
    port: '3000',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/index.html',
      publicPath: '',
      apikey: apikey
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '...']
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(j|t)sx?$/i,
        exclude: /[\\/]node_modules[\\/]/,
        use: ['ts-loader'],
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};