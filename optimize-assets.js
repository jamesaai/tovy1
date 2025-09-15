const fs = require('fs');
const path = require('path');

function analyzeBuildOutput() {
  console.log('🔍 Analyzing Build Output...\n');
  
  const distDir = 'dist';
  if (!fs.existsSync(distDir)) {
    console.log('❌ No dist directory found. Run "npm run build" first.');
    return;
  }
  
  // Analyze JS files
  const jsFiles = [];
  const cssFiles = [];
  const imageFiles = [];
  const fontFiles = [];
  
  function scanDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        scanDirectory(fullPath, relativePath);
      } else {
        const ext = path.extname(item).toLowerCase();
        const size = stats.size;
        
        if (ext === '.js') {
          jsFiles.push({ name: relativePath, size });
        } else if (ext === '.css') {
          cssFiles.push({ name: relativePath, size });
        } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
          imageFiles.push({ name: relativePath, size });
        } else if (['.woff', '.woff2', '.eot', '.ttf', '.otf'].includes(ext)) {
          fontFiles.push({ name: relativePath, size });
        }
      }
    });
  }
  
  scanDirectory(distDir);
  
  // Sort by size (largest first)
  const sortBySize = (a, b) => b.size - a.size;
  
  console.log('📊 Build Analysis Results:');
  console.log('==========================\n');
  
  // JS Analysis
  console.log('📦 JavaScript Files:');
  console.log('-------------------');
  jsFiles.sort(sortBySize).forEach(file => {
    const sizeKB = (file.size / 1024).toFixed(1);
    const status = file.size > 500 * 1024 ? '⚠️ ' : '✅ ';
    console.log(`${status}${file.name}: ${sizeKB} KB`);
  });
  
  // CSS Analysis
  console.log('\n🎨 CSS Files:');
  console.log('-------------');
  cssFiles.sort(sortBySize).forEach(file => {
    const sizeKB = (file.size / 1024).toFixed(1);
    const status = file.size > 200 * 1024 ? '⚠️ ' : '✅ ';
    console.log(`${status}${file.name}: ${sizeKB} KB`);
  });
  
  // Image Analysis
  console.log('\n🖼️  Image Files:');
  console.log('---------------');
  imageFiles.sort(sortBySize).forEach(file => {
    const sizeKB = (file.size / 1024).toFixed(1);
    const status = file.size > 250 * 1024 ? '⚠️ ' : '✅ ';
    console.log(`${status}${file.name}: ${sizeKB} KB`);
  });
  
  // Font Analysis
  console.log('\n🔤 Font Files:');
  console.log('-------------');
  fontFiles.sort(sortBySize).forEach(file => {
    const sizeKB = (file.size / 1024).toFixed(1);
    const status = file.size > 300 * 1024 ? '⚠️ ' : '✅ ';
    console.log(`${status}${file.name}: ${sizeKB} KB`);
  });
  
  // Summary
  const totalSize = [...jsFiles, ...cssFiles, ...imageFiles, ...fontFiles]
    .reduce((sum, file) => sum + file.size, 0);
  
  console.log('\n📈 Summary:');
  console.log('===========');
  console.log(`Total assets: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`JavaScript: ${jsFiles.length} files, ${(jsFiles.reduce((s, f) => s + f.size, 0) / 1024 / 1024).toFixed(2)} MB`);
  console.log(`CSS: ${cssFiles.length} files, ${(cssFiles.reduce((s, f) => s + f.size, 0) / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Images: ${imageFiles.length} files, ${(imageFiles.reduce((s, f) => s + f.size, 0) / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Fonts: ${fontFiles.length} files, ${(fontFiles.reduce((s, f) => s + f.size, 0) / 1024 / 1024).toFixed(2)} MB`);
  
  // Recommendations
  console.log('\n💡 Optimization Recommendations:');
  console.log('================================');
  
  const largeImages = imageFiles.filter(f => f.size > 250 * 1024);
  const largeFonts = fontFiles.filter(f => f.size > 300 * 1024);
  const largeJS = jsFiles.filter(f => f.size > 500 * 1024);
  const largeCSS = cssFiles.filter(f => f.size > 200 * 1024);
  
  if (largeImages.length > 0) {
    console.log('\n🖼️  Large Images to Optimize:');
    largeImages.forEach(img => {
      console.log(`  - ${img.name} (${(img.size / 1024).toFixed(1)} KB)`);
    });
    console.log('  → Use TinyPNG, Squoosh, or similar tools to compress');
  }
  
  if (largeFonts.length > 0) {
    console.log('\n🔤 Large Fonts to Optimize:');
    largeFonts.forEach(font => {
      console.log(`  - ${font.name} (${(font.size / 1024).toFixed(1)} KB)`);
    });
    console.log('  → Consider font subsetting or using system fonts');
  }
  
  if (largeJS.length > 0) {
    console.log('\n📦 Large JS Bundles:');
    largeJS.forEach(js => {
      console.log(`  - ${js.name} (${(js.size / 1024).toFixed(1)} KB)`);
    });
    console.log('  → Consider further code splitting or tree shaking');
  }
  
  if (largeCSS.length > 0) {
    console.log('\n🎨 Large CSS Files:');
    largeCSS.forEach(css => {
      console.log(`  - ${css.name} (${(css.size / 1024).toFixed(1)} KB)`);
    });
    console.log('  → Consider purging unused CSS or component-level imports');
  }
  
  if (largeImages.length === 0 && largeFonts.length === 0 && largeJS.length === 0 && largeCSS.length === 0) {
    console.log('🎉 All assets are reasonably sized! Great job!');
  }
}

analyzeBuildOutput();