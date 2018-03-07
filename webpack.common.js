const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

module.exports = {

  entry: {
    app:  path.resolve(sourcePath, 'index.tsx')
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loaders:["babel-loader","awesome-typescript-loader"]},

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      // Loads URLs specified in CSS files
      {
        test:/\.(png|jpe?g|gif)$/,
        exclude:/node_modules/,
        loader: 'url-loader?limit=1024&name=/assets/[name].[ext]'
      }
    ]
  },

  // Sometimes it's preferrable to keep 3rd party libraries external.  If this
  // section is uncommented, you must place a script tag somewhere to import
  // the library as the build process will skip bundling these external references
  /*externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "mapbox-gl": "mapboxgl",
    "chart.js": "Chart"
  },*/

  plugins: [
    // Inject the bundles into the distribution index.html
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/app.html',
      filename: 'index.html'
    }),

    // Copy the data folder to build folder
    new CopyWebpackPlugin([
      { from: 'data', to: 'data' }
    ])
  ]
};