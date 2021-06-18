import webpack from 'webpack';
// import autoprefixer from 'autoprefixer';
import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';



module.exports = (env, argv) => {
  const { prod } = env;
  const dev = !prod;
  const browsers = ['> 1%', 'last 2 versions']
  return {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    mode: prod ? 'production' : 'development',
  
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'bundle.js',
      libraryTarget: 'umd'
    },
  
    resolve: {
      extensions: ['', '.jsx', '.js', '.json', '.scss'],
      modules: [
        path.resolve(__dirname, 'src/lib'),
        path.resolve(__dirname, 'node_modules'),
        'node_modules'
      ],
      alias: {
        components: path.resolve(__dirname, 'src/components'), // used for tests
        style: path.resolve(__dirname, 'src/style'),
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }
    },
  
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
        {
          // Transform our own .(scss|css) files with PostCSS and CSS-modules
          test: /\.(scss|css)$/,
          include: [path.resolve(__dirname, 'src/components')],
          use: [
            `style-loader`,
            {loader: 'css-loader', options: { sourceMap: dev, modules: true, importLoaders: 1 }},
            'postcss-loader',
            {loader: 'sass-loader', options: { sourceMap: dev }},
          ]
        },
        {
          test: /\.(scss|css)$/,
          exclude: [path.resolve(__dirname, 'src/components')],
          use: [
            `style-loader`,
            {loader: 'css-loader', options: { sourceMap: dev }},
            'postcss-loader',
            {loader: 'sass-loader', options: { sourceMap: dev }},
          ]
        },
        { test: /\.json$/, use: 'json-loader' },
        { test: /\.(xml|html|txt|md)$/, use: 'raw-loader' },
        {
          test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
          use: prod ? 'file-loader?name=[path][name]_[hash:base64:5].[ext]' : 'url-loader'
        }
      ]
    },
  
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      // new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
      // new HtmlWebpackPlugin(),
    ],
  
    stats: { colors: true },
  
    // node: {
    //   global: true,
    //   process: false,
    //   Buffer: false,
    //   __filename: false,
    //   __dirname: false,
    //   setImmediate: false
    // },
  
    devtool: prod ? false : 'source-map',
  
    devServer: {
      port: env.port || 9009,
      hot: true, inline: true,
      contentBase: '.',  // use index.html at root
      publicPath: '/build',
      // colors: true,
      historyApiFallback: true,
      open: true
    }
  }
};
