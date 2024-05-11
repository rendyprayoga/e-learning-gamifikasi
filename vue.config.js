module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    // prettier-ignore
    svgRule
      .use("babel-loader")
        .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
        .loader("vue-svg-loader")
        .options({ 
          svgo: { 
            plugins: [{ removeDimensions: true }, { removeViewBox: false }]
          }
        });

    // prettier-ignore
    config.plugin("html").tap((args) => {
      args[0].title = 'E-learning Gamifikasi'
      return args;
    });
  },

  css: {
    extract:
      // Ignore order.
      // https://github.com/vuejs/vue-cli/issues/3771#issuecomment-593360794
      process.env.NODE_ENV === 'production' ? { ignoreOrder: true } : false,
    loaderOptions: {
      sass: {
        prependData: '@import "src/assets/scss/abstract";',
      },
    },
    sourceMap: true,
  },

  lintOnSave: false,

  publicPath: process.env.VUE_APP_CMS_PATH,

  transpileDependencies: ['bootstrap/js/src'],
};
