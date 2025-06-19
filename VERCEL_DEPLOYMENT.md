# Vercel Deployment Guide - Updated

## ERROR RESOLVED: "Cannot find module '/vercel/path0/webpack.prod.js'"

### Root Cause Analysis:
Error terjadi karena Vercel tidak dapat menemukan file `webpack.prod.js` dengan path relatif yang benar.

### Solution Implemented:

#### 1. Updated `vercel.json` with Build Command Override
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "public",
        "buildCommand": "npm install && npx webpack --config webpack.prod.js"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### 2. Package.json Scripts Updated
```json
{
  "scripts": {
    "vercel-build": "NODE_ENV=production npx webpack --config webpack.prod.js",
    "build:vercel": "npm run build"
  }
}
```

#### 3. Alternative Solutions Available:
- **Option A**: Use `buildCommand` in `vercel.json` (Recommended)
- **Option B**: Use `vercel-build` script in `package.json`
- **Option C**: Use custom build script (`build.sh`)

### Deployment Steps:

1. **Commit Changes**
```bash
git add .
git commit -m "fix: vercel deployment configuration"
git push origin main
```

2. **Vercel Dashboard Settings**
- Root Directory: `./` (keep default)
- Build Command: Let Vercel auto-detect (will use vercel.json config)
- Output Directory: `public`
- Install Command: `npm install`

3. **Environment Variables** (if needed)
- Add any required environment variables in Vercel dashboard

### Local Testing:
```bash
# Test build locally
npm run vercel-build

# Test serve locally  
npm run serve
```

### Troubleshooting:

#### If still getting webpack config errors:
1. Check if all webpack config files are committed to git
2. Verify `webpack.prod.js` exists in root directory
3. Ensure `webpack-merge` is in dependencies (not devDependencies)

#### If build succeeds but deployment fails:
1. Check Vercel build logs for specific errors
2. Verify `public` folder contains `index.html`
3. Check file permissions and case sensitivity

### Files Changed:
- ✅ `vercel.json` - Added buildCommand override
- ✅ `package.json` - Updated vercel-build script
- ✅ `build.sh` - Alternative build script
- ✅ `webpack.common.js` - Output to public folder
- ✅ `.vercelignore` - Optimize deployment

### Expected Build Output:
```
public/
├── index.html
├── app.bundle.js
├── *.bundle.js (chunks)
├── sw.bundle.js
├── data/
├── icons/
├── images/
└── app.webmanifest
```

### Success Indicators:
✅ Local build: `npm run vercel-build` completes without errors
✅ Public folder created with all assets
✅ Vercel deployment shows "Deployment Completed"
✅ Website accessible at Vercel URL
