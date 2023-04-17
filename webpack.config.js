const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'source-map',
  mode: 'production', // 'none',
  externals: [
    // { 'aws-sdk': 'commonjs aws-sdk' }, 'pg-hstore', // remove aws-sdk
    nodeExternals(),
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                    node: '14',
                  },
                },
              ],
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'file-loader', // npm package required
        options: {
          name: '[path][name].[ext]',
        },
      },
      /* {
        exclude: /^.*\.(test).(js)$/,
      }, */
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
};
