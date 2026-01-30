import AdmZip from 'adm-zip';

const zip = new AdmZip('./trustworthy-web-presence-main.zip');
const entries = zip.getEntries();

// Log all entries
entries.forEach(entry => {
  console.log(`File: ${entry.entryName}`);
  if (!entry.isDirectory && entry.entryName.endsWith('.tsx') || entry.entryName.endsWith('.ts') || entry.entryName.endsWith('.css') || entry.entryName.endsWith('.json')) {
    console.log('--- Content ---');
    console.log(entry.getData().toString('utf8').substring(0, 500));
    console.log('---');
  }
});

// Extract to ./extracted folder
zip.extractAllTo('./extracted', true);
console.log('\nExtracted to ./extracted');
