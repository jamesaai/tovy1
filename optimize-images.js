const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  const inputDir = 'src/assets';
  const outputDir = 'src/assets/optimized';
  
  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    // Optimize PNG images
    const pngFiles = await imagemin([`${inputDir}/*.png`], {
      destination: outputDir,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8], // Reduce quality to 60-80%
          speed: 1
        })
      ]
    });
    
    console.log('Optimized PNG files:', pngFiles.map(f => f.destinationPath));
    
    // Get file sizes before and after
    const originalFiles = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
    
    console.log('\nFile size comparison:');
    console.log('====================');
    
    for (const file of originalFiles) {
      const originalPath = path.join(inputDir, file);
      const optimizedPath = path.join(outputDir, file);
      
      if (fs.existsSync(optimizedPath)) {
        const originalSize = fs.statSync(originalPath).size;
        const optimizedSize = fs.statSync(optimizedPath).size;
        const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        
        console.log(`${file}:`);
        console.log(`  Original: ${(originalSize / 1024).toFixed(1)} KB`);
        console.log(`  Optimized: ${(optimizedSize / 1024).toFixed(1)} KB`);
        console.log(`  Reduction: ${reduction}%`);
        console.log('');
      }
    }
    
    console.log('Image optimization completed!');
    console.log('Replace the original images with the optimized versions in src/assets/optimized/');
    
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();