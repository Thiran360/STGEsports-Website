const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directoryPath = path.join(__dirname, 'src', 'assets');

async function optimizeImages() {
  try {
    const files = await fs.promises.readdir(directoryPath);
    let totalSaved = 0;

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const filePath = path.join(directoryPath, file);
        const stats = await fs.promises.stat(filePath);
        
        // Optimize if file is larger than 100KB
        if (stats.size > 100 * 1024) {
          console.log(`Optimizing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
          const tempPath = path.join(directoryPath, `temp_${file}`);
          
          try {
            if (ext === '.png') {
              await sharp(filePath)
                .png({ quality: 80, compressionLevel: 9 })
                .toFile(tempPath);
            } else {
              await sharp(filePath)
                .jpeg({ quality: 80, progressive: true })
                .toFile(tempPath);
            }

            const newStats = await fs.promises.stat(tempPath);
            totalSaved += (stats.size - newStats.size);
            
            // Replace original file
            await fs.promises.unlink(filePath);
            await fs.promises.rename(tempPath, filePath);
            
            console.log(`✅ Compressed ${file} - Saved: ${((stats.size - newStats.size) / 1024).toFixed(2)} KB`);
          } catch (err) {
            console.error(`❌ Error compressing ${file}:`, err);
            // Cleanup temp file if exists
            if (fs.existsSync(tempPath)) {
              await fs.promises.unlink(tempPath);
            }
          }
        }
      }
    }
    
    console.log(`\n🎉 Optimization complete! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  } catch (err) {
    console.error('Unable to scan directory: ' + err);
  }
}

optimizeImages();
