const path = require('path')

module.exports = {
  entry: path.join(__dirname, '../src/index'),
  node: {
    fs: 'empty',
    child_process: 'empty',
    path: true,
    crypto: true,
    util: true,
    stream: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true
            }
          }
        ]
      }
    ]
  },
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components/'),
      configurables: path.resolve(__dirname, '../src/configurables/'),
      helpers: path.resolve(__dirname, '../src/helpers/'),
      mocks: path.resolve(__dirname, '../src/mocks/'),
      modules: path.resolve(__dirname, '../src/modules/'),
      screens: path.resolve(__dirname, '../src/screens/'),
      services: path.resolve(__dirname, '../src/services/'),
      stubs: path.resolve(__dirname, '../src/stubs/'),
      tests: path.resolve(__dirname, '../src/tests/'),
      utils: path.resolve(__dirname, '../src/utils/')
    }
  }
}
