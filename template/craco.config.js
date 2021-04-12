const startCase = require('lodash/startCase');
const packageJson = require('./package.json');

const packageName = packageJson.name;
const libraryName = startCase(packageName).replaceAll(' ', '');

module.exports = {
  style: {
    postcss: {
      plugins: [],
      env: {
        stage: 1,
        features: {
          'logical-properties-and-values': {
            dir: 'ltr',
          },
        },
      },
    },
  },
  webpack: {
    configure: {
      output: {
        filename: 'static/js/[name].js',
        library: libraryName,
        libraryTarget: 'umd',
      },
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          chunks(chunk) {
            return false;
          },
        },
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          const miniCssExtractPluginIndex = webpackConfig.plugins.findIndex(
            (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
          );

          if (miniCssExtractPluginIndex > -1) {
            webpackConfig.plugins[miniCssExtractPluginIndex].options.filename =
              'static/css/[name].css';
          }

          return webpackConfig;
        },
      },
      options: {},
    },
  ],
};
