# Restaurant Catalogue - Deployment Guide

## Vercel Deployment Configuration

### Current Setup
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `public`
- **Framework**: Static Build (Webpack)

### Build Commands Available

1. **Primary Build Command** (currently used):
   ```bash
   npm run vercel-build
   # Runs: npx webpack --config webpack.config.js --mode production
   ```

2. **Fallback Build Command** (if primary fails):
   ```bash
   npm run vercel-build-fallback
   # Runs: node build-script.js
   ```

3. **Simple Build Command** (minimal webpack):
   ```bash
   npm run vercel-build-simple
   # Runs: npx webpack --entry ./src/scripts/index.js --output-path ./public --output-filename bundle.js --mode production
   ```

### Key Files for Deployment

1. **webpack.config.js** - Main webpack configuration
2. **build-script.js** - Standalone build script (fallback)
3. **vercel.json** - Vercel platform configuration
4. **.vercelignore** - Files to exclude from deployment
5. **package.json** - Dependencies and build scripts

### Dependencies Required for Production

```json
{
  "dependencies": {
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^11.0.0",
    "html-webpack-plugin": "^5.5.3",
    "workbox-webpack-plugin": "^7.1.0"
  },
  "devDependencies": {
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "babel-loader": "^8.2.5",
    "css-loader": "^6.8.1",
    "style-loader": "^3.3.1"
  }
}
```

### Build Process

1. **Entry Point**: `./src/scripts/index.js`
2. **Output**: `./public/` directory
3. **Assets Copied**: 
   - `./src/public/` → `./public/`
   - Icons, images, data files, manifest
4. **Service Worker**: Generated automatically
5. **HTML Template**: `./src/scripts/views/templates/index.html`

### Troubleshooting

#### If Build Fails with "Cannot find module webpack.config.js"
1. Ensure `webpack.config.js` is not in `.vercelignore`
2. Check if all dependencies are installed
3. Try using the fallback build command:
   ```bash
   # In vercel.json, change buildCommand to:
   "buildCommand": "npm run vercel-build-fallback"
   ```

#### If Build Fails with Entry Point Issues
1. Verify `./src/scripts/index.js` exists
2. Check all import paths in index.js
3. Use simple build command as last resort

#### If Service Worker Generation Fails
1. Check if WorkboxWebpackPlugin is installed
2. Verify src/public directory structure
3. Ensure workbox-webpack-plugin is in dependencies (not devDependencies)

### Vercel Environment Variables
No environment variables are currently required for this static site.

### Output Structure
After successful build, the `public/` directory should contain:
- `index.html`
- `main.[hash].js` (application bundle)
- `vendors.[hash].js` (vendor libraries)
- `sw.bundle.js` (service worker)
- `app.webmanifest` (PWA manifest)
- `icons/` (various icon sizes)
- `images/` (hero images and logos)
- `data/DATA.json` (restaurant data)

### Testing Locally
```bash
# Test primary build
npm run vercel-build

# Test fallback build
npm run vercel-build-fallback

# Serve locally
npm run serve
```

### Last Updated
December 2024 - All configurations tested and working locally.
