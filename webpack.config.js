const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { 
          configFile: 'tsconfig-cjs.json',
          onlyCompileBundledFiles: true
        }
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },  
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    clean: true
  },
};