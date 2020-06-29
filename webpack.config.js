//  modulos invocados de  node y de npm instalados para desarrollo
const path = require('path');
// para migrar y reducir codigo de index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// para migrar codigo Css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// modo de ambiente sera Verdad para Desarrollo o Falso para Produccion
// valor de devMode  
const devMode = process.env.NODE_ENV !== 'production'


// cONFIGURANDO WEBPACK empaquetador de modulos
// entry donde esta el JS principal app.js y donde llevarlo qu es  a
//  la ruta /backend/public desde /frontend
module.exports = {
  entry: './frontend/app.js',
  mode: 'development', // armado para convertir a produccion
  output: {
    path: path.join(__dirname, 'backend/public'),
    filename: 'js/bundle.js' // nombre q se asignara al JS en backend/public 
  },
  mode: 'development', // temporal para indicar modo ambiente en q estamos
  module : {
    rules: [
      {
        // testea todos los .ccs y usa  style-loader o css-loader
        test: /\.css/,
        use: [
          // si devMode es Desarrollo carga style-loader sino css-loader
          // style-loader carga Css en Js y css-loader carga propio Css
          // o sea geneera un .css en backend/public
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  // define que archivo index.html va a ir de /frontend a backend/public
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/index.html',
      // minificar y reducir a una linea el codigo Html para produccion
      // sera mas rapido paa ser consumido por navegador
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/bundle.css" // archivo .css q creara este plugin
    })
  ],
  devtool: 'source-map'
};
