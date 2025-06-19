#!/usr/bin/env node

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

console.log('🚀 Starting Vercel build process...');

const webpackConfig = {
  mode: 'production',
  entry: './src/scripts/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/scripts/views/templates/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/public/',
          to: './',
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/restaurant-api.dicoding.dev\//,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurants-api',
          },
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: false,
  },
};

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  if (err) {
    console.error('❌ Build failed with error:', err);
    process.exit(1);
  }

  if (stats.hasErrors()) {
    console.error('❌ Build failed with compilation errors:');
    console.error(stats.toJson().errors);
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    console.warn('⚠️ Build completed with warnings:');
    console.warn(stats.toJson().warnings);
  }

  console.log('✅ Build completed successfully!');
  console.log('📁 Output directory: public/');
  
  const info = stats.toJson();
  console.log(`📦 Assets generated: ${info.assets.length} files`);
  console.log(`⚡ Build time: ${stats.endTime - stats.startTime}ms`);
  
  compiler.close((closeErr) => {
    if (closeErr) {
      console.error('❌ Error closing compiler:', closeErr);
      process.exit(1);
    }
    console.log('🎉 Build process completed!');
  });
});
