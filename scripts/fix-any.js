const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // Replace .map((item) =>
  newContent = newContent.replace(/\.map\(\s*\(\s*([a-zA-Z]+)\s*\)\s*=>/g, '.map(($1: any) =>');
  
  // Replace .map((item, idx) =>
  newContent = newContent.replace(/\.map\(\s*\(\s*([a-zA-Z]+)\s*,\s*([a-zA-Z]+)\s*\)\s*=>/g, '.map(($1: any, $2: number) =>');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
    console.log('Fixed:', file);
  }
});
console.log('Total files fixed:', changedCount);
