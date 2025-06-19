#!/bin/bash
# Vercel build script

echo "Starting build process..."

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the project
echo "Building project..."
npx webpack --config webpack.prod.js --mode production

# Check if build was successful
if [ -d "public" ] && [ -f "public/index.html" ]; then
    echo "Build successful! Output directory: public"
    ls -la public/
else
    echo "Build failed - public directory or index.html not found"
    exit 1
fi

echo "Build process completed successfully!"
