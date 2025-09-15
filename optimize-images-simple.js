const fs = require('fs');
const path = require('path');

// Simple image optimization script that creates a report
// and provides recommendations for manual optimization

function analyzeImages() {
  console.log('Analyzing image files...\n');
  
  const assetsDir = 'src/assets';
  const imageFiles = fs.readdirSync(assetsDir).filter(file => 
    file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
  );
  
  console.log('Image Analysis Report:');
  console.log('=====================\n');
  
  let totalSize = 0;
  const largeImages = [];
  
  imageFiles.forEach(file => {
    const filePath = path.join(assetsDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    totalSize += stats.size;
    
    console.log(`${file}: ${sizeKB} KB`);
    
    if (stats.size > 250 * 1024) { // Files larger than 250KB
      largeImages.push({
        name: file,
        size: stats.size,
        sizeKB: sizeKB
      });
    }
  });
  
  console.log(`\nTotal image size: ${(totalSize / 1024).toFixed(1)} KB`);
  
  if (largeImages.length > 0) {
    console.log('\n⚠️  Large images that need optimization:');
    console.log('=====================================');
    
    largeImages.forEach(img => {
      console.log(`${img.name}: ${img.sizeKB} KB`);
    });
    
    console.log('\n📋 Optimization Recommendations:');
    console.log('================================');
    console.log('1. Use online tools like TinyPNG or Squoosh to compress images');
    console.log('2. Consider converting PNG to WebP format for better compression');
    console.log('3. Resize images to appropriate dimensions for web use');
    console.log('4. Use responsive images with different sizes for different screen sizes');
    
    console.log('\n🔧 Manual optimization steps:');
    console.log('=============================');
    largeImages.forEach(img => {
      console.log(`- Optimize ${img.name} (currently ${img.sizeKB} KB)`);
    });
  } else {
    console.log('\n✅ All images are reasonably sized!');
  }
  
  console.log('\n📦 Bundle Size Recommendations:');
  console.log('===============================');
  console.log('1. Implement lazy loading for images');
  console.log('2. Use WebP format with PNG fallbacks');
  console.log('3. Consider using a CDN for image delivery');
  console.log('4. Implement responsive images with srcset');
}

analyzeImages();