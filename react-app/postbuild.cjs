const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const targetDir = path.join(__dirname, '..');

// Helper to delete a folder recursively
function deleteFolderRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
}

// Helper to copy folder recursively
function copyFolderRecursiveSync(source, target) {
  let files = [];
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        fs.copyFileSync(curSource, path.join(targetFolder, file));
      }
    });
  }
}

// 1. Delete previous production assets at the root
const oldAssetsDir = path.join(targetDir, 'assets');
if (fs.existsSync(oldAssetsDir)) {
  deleteFolderRecursive(oldAssetsDir);
  console.log('Removed old assets/ directory from root.');
}

const oldHtml = path.join(targetDir, 'index.html');
if (fs.existsSync(oldHtml)) {
  fs.unlinkSync(oldHtml);
  console.log('Removed old index.html from root.');
}

// 2. Copy compiled dist contents to the root
if (fs.existsSync(distDir)) {
  const items = fs.readdirSync(distDir);
  items.forEach(item => {
    const srcPath = path.join(distDir, item);
    const destPath = path.join(targetDir, item);
    
    if (fs.lstatSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
      fs.readdirSync(srcPath).forEach(subItem => {
        const subSrc = path.join(srcPath, subItem);
        const subDest = path.join(destPath, subItem);
        if (fs.lstatSync(subSrc).isDirectory()) {
          copyFolderRecursiveSync(subSrc, destPath);
        } else {
          fs.copyFileSync(subSrc, subDest);
        }
      });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
  console.log('Successfully copied build files from dist/ to repository root.');
  
  // 3. Delete dist directory
  deleteFolderRecursive(distDir);
  console.log('Cleaned up react-app/dist/ folder.');
} else {
  console.error('dist/ directory not found! Run npm run build first.');
}
