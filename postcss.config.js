module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowsersList: ['last 2 versions'],
    }),
    // Add other PostCSS plugins here (e.g., cssnano for minification)
  ],
};
