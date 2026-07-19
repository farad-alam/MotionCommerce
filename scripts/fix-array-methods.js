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

const methods = ['filter', 'find', 'some', 'every', 'reduce', 'forEach'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  methods.forEach(method => {
    // Replace .method((item) =>
    const regex1 = new RegExp(`\\.${method}\\(\\s*\\(\\s*([a-zA-Z]+)\\s*\\)\\s*=>`, 'g');
    newContent = newContent.replace(regex1, `.${method}(($1: any) =>`);
    
    // Replace .method((item, idx) =>
    const regex2 = new RegExp(`\\.${method}\\(\\s*\\(\\s*([a-zA-Z]+)\\s*,\\s*([a-zA-Z]+)\\s*\\)\\s*=>`, 'g');
    newContent = newContent.replace(regex2, `.${method}(($1: any, $2: number) =>`);

    // Replace .method(item =>
    const regex3 = new RegExp(`\\.${method}\\(\\s*([a-zA-Z]+)\\s*=>`, 'g');
    newContent = newContent.replace(regex3, `.${method}(($1: any) =>`);
  });
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
    console.log(`Fixed ${file}`);
  }
});
console.log('Total files fixed:', changedCount);
