const path = require('path')


module.exports= {
  mode: 'production', // Set mode to 'production' or 'development'
  entry: './src/main.jsx', // Entry point for your application
  output: {
    filename: 'main.bundle.js', // Output filename
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel loader for JavaScript and JSX files
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets
          },
        },
      },
      {
        test: /\.css$/,
        use: [ 'css-loader'], // Use style-loader and css-loader for CSS files
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader', // Use file-loader for image files
            options: {
              name: '[name].[ext]', // Preserve original filename with extension
              outputPath: 'assets', // Output directory for images within 'dist'
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions when importing files
  },
};
