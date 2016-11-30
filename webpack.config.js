module.exports = {
  entry: __dirname + '/public/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'script.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};
