import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

const zip = new AdmZip('./trustworthy-web-presence-main.zip');
const zipEntries = zip.getEntries();

console.log('=== ZIP Contents ===');
zipEntries.forEach(entry => {
  console.log(entry.entryName);
});

// Extract all files
zip.extractAllTo('./extracted', true);
console.log('\n=== Extraction complete ===');
