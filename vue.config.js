const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const compress = new CompressionWebpackPlugin({
  filename: info => {
    return `${info.path}.gz${info.query}`
  },
  algorithm: 'gzip',
  threshold: 10240,
  test: new RegExp(
    '\\.(' + ['js'].join('|') +
    ')$'
  ),
  minRatio: 0.8,
  deleteOriginalAssets: false
})

module.exports = {
  productionSourceMap: false,
  devServer: {

    before(app) {
      app.get(/.*.(js)$/, (req, res, next) => {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
      })
    }
  },
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })]
    },
    plugins: [compress]
  },
  chainWebpack: config => {
    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: 'all'
    })
    config.externals({
      vue: 'Vue',
      'vue-router':'VueRouter',
      'axios':'axios',
      'bootstrap-vue': "'bootstrap-vue'"
  })
  },
  css: {
    extract: true
  }
}