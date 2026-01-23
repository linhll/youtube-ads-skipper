const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const typescriptRule = {
  test: /\.tsx?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
};

const cssRule = {
  test: /\.(scss|css)$/i,
  use: [
    'style-loader', // 4. Injects styles into the DOM
    'css-loader', // 3. Turns CSS into a JS module
    'postcss-loader', // 2. Processes CSS with PostCSS plugins
    'sass-loader', // 1. Compiles Sass/SCSS to CSS
  ],
};

module.exports = [
  {
    name: 'scripts',
    entry: {
      main: './src/scripts/main.ts',
      'skip-ads': './src/scripts/skip-ads.ts',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [typescriptRule, cssRule],
    },
    output: {
      filename: 'scripts/[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'manifest.json',
          },
        ],
      }),
    ],
    mode: 'production',
  },
  {
    name: 'popup',
    dependencies: ['scripts'],
    entry: './src/popup/index.ts',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    },
    module: {
      rules: [typescriptRule, cssRule],
    },
    output: {
      filename: 'popup/[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'popup/index.html',
        filename: 'popup/index.html',
        inject: 'body',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'popup',
            to: 'popup',
            filter: (resourcePath) => !resourcePath.endsWith('index.html'),
          },
        ],
      }),
    ],
    mode: 'production',
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
    },
  },
];
