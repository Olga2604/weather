module.exports = {
  devServer: {
    proxy: {
      '/api/weather/forecast': {
        target: 'http://localhost:8081',
        ws: true,
        changeOrigin: false,
      },
    },
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        data: '@import "@/assets/scss/colors.scss";',
      },
    },
  },
};
