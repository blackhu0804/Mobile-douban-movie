const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js', //打包后输出的文件名
    publicPath: 'build/' // 打包后的文件夹
  },
  resolve: {
    alias: {
      jquery: path.join(__dirname, 'src/lib/jquery.min.js')
    }
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"),
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]",
        options: {
          name: 'assets/[name]_[sha512:hash:base64:7].[ext]'
        }
      }
    ]
  }
}