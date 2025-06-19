#!/usr/bin/env node

// Vercel Build Validator
// This script checks if all required files exist before deployment

const fs = require('fs');
const path = require('path');

console.log('🔍 Vercel Build Validator');
console.log('========================');

const requiredFiles = [
  'webpack.config.js',
  'package.json',
  'src/scripts/index.js',
  'src/scripts/views/templates/index.html',
  'src/public/app.webmanifest',
  'src/public/data/DATA.json',
  'src/public/icons/icon-192x192.png',
  'src/public/icons/icon-512x512.png',
  'src/styles/main.css'
];

const optionalFiles = [
  'vercel.json',
  'build-script.js',
  '.vercelignore'
];

let allGood = true;

console.log('\n✅ Checking required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.resolve(__dirname, file));
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allGood = false;
});

console.log('\n📋 Checking optional files:');
optionalFiles.forEach(file => {
  const exists = fs.existsSync(path.resolve(__dirname, file));
  console.log(`  ${exists ? '✅' : '⚠️ '} ${file}`);
});

console.log('\n🔧 Build Commands Available:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const scripts = packageJson.scripts || {};
  
  ['vercel-build', 'vercel-build-fallback', 'vercel-build-simple'].forEach(script => {
    if (scripts[script]) {
      console.log(`  ✅ ${script}: ${scripts[script]}`);
    } else {
      console.log(`  ❌ ${script}: Not found`);
      allGood = false;
    }
  });
} catch (error) {
  console.log('  ❌ Error reading package.json:', error.message);
  allGood = false;
}

console.log('\n📦 Dependencies Check:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const criticalDeps = [
    'webpack',
    'webpack-cli', 
    'html-webpack-plugin',
    'copy-webpack-plugin',
    'workbox-webpack-plugin',
    'babel-loader',
    'css-loader',
    'style-loader'
  ];
  
  criticalDeps.forEach(dep => {
    if (deps[dep]) {
      console.log(`  ✅ ${dep}: ${deps[dep]}`);
    } else {
      console.log(`  ❌ ${dep}: Missing`);
      allGood = false;
    }
  });
} catch (error) {
  console.log('  ❌ Error checking dependencies:', error.message);
  allGood = false;
}

console.log('\n🚀 Vercel Configuration:');
try {
  if (fs.existsSync('vercel.json')) {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    console.log(`  ✅ Build Command: ${vercelConfig.buildCommand || 'Not specified'}`);
    console.log(`  ✅ Output Directory: ${vercelConfig.outputDirectory || 'Not specified'}`);
  } else {
    console.log('  ⚠️  No vercel.json found (using package.json scripts)');
  }
} catch (error) {
  console.log('  ❌ Error reading vercel.json:', error.message);
}

console.log('\n📝 .vercelignore Check:');
try {
  if (fs.existsSync('.vercelignore')) {
    const ignoreContent = fs.readFileSync('.vercelignore', 'utf8');
    const ignoreLines = ignoreContent.split('\n').filter(line => line.trim());
    
    // Check if critical files are ignored
    const criticalPaths = ['src', 'webpack.config.js'];
    criticalPaths.forEach(path => {
      const isIgnored = ignoreLines.some(line => 
        line.trim() === path || 
        line.trim().startsWith(path + '/') ||
        (line.includes('*') && new RegExp(line.replace(/\*/g, '.*')).test(path))
      );
      
      if (isIgnored) {
        console.log(`  ❌ ${path} is ignored (this will cause build failures)`);
        allGood = false;
      } else {
        console.log(`  ✅ ${path} is not ignored`);
      }
    });
  } else {
    console.log('  ⚠️  No .vercelignore found');
  }
} catch (error) {
  console.log('  ❌ Error reading .vercelignore:', error.message);
}

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 All checks passed! Ready for Vercel deployment.');
  process.exit(0);
} else {
  console.log('❌ Some issues found. Please fix before deploying.');
  process.exit(1);
}
