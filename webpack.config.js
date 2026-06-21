// . definicion de contenedores para importacion de modulos de entorno 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = {
  // 1. Punto de entrada de la aplicación
  entry: './src/app.js',

  // 2. Punto de salida (Archivos listos para producción en la raíz de 'dist')
  output: {
    filename: 'bundle.js', // Genera el JS directamente en la raíz de dist.
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Limpia la carpeta dist en cada compilación
  },

  // 3. Modo de ejecución
  mode: 'production',

  // 4. Reglas y Loaders (Procesamiento de archivos CSS e Imágenes)
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]', // Conserva los nombres originales de tus recursos visuales
        },
      },
    ],
  },

  // 5. Optimizaciones y Minificación
  optimization: {
    minimize: true,
    minimizer: [
      `...`, // Mantiene los minimizadores por defecto para JavaScript
      new CssMinimizerPlugin(), // Minifica el archivo de estilos
      new HtmlMinimizerPlugin(), // Minifica el HTML estructurado
    ],
  },

  // 6. Plugins (Inyección automática del bundle corregido en las 5 páginas)
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css', // Genera el CSS directamente en la raíz de dist
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/catalogo.html',
      filename: 'catalogo.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/modelos.html',
      filename: 'modelos.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/nosotros.html',
      filename: 'nosotros.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/contacto.html',
      filename: 'contacto.html',
    }),
  ],
};