#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Google Docs URLs for InfoPage components (pages/)
const pages = {
  'About': {
    url: 'https://docs.google.com/document/d/1xT6jquARDUdF3h-RaePiRL3mdfQ3_h1bhtkj5Q3OlB0',
    icon: "InfoIcon",
    iconImport: "import InfoIcon from '@mui/icons-material/Info';",
  },
};

// Google Docs URLs for each section
const sections = {
  'aspirational': 'https://docs.google.com/document/d/196lc34oglHYc1olevXr7-dZvboUkHLEobRqDi_RMq3M',
  'bacon': 'https://docs.google.com/document/d/1-6bwszWuE9PFinHCk0x0QUCebNA9kpKRxXs3h6qPEQ8',
  'cant': 'https://docs.google.com/document/d/1-w8HdiHN2xWiWVgjeq5hm7-Ob3Qr89KEuSnGD8aTw8o',
  'cheese': 'https://docs.google.com/document/d/1ymB_2Q62bakJ_mfdSUJChktJQQCeY1zVcRjI5g1LVLY',
  'cow': 'https://docs.google.com/document/d/1ew5FQ46yob-gCc7Bqcmbc_jfkNCM6g8kwANU9v2i5lo',
  'eat': 'https://docs.google.com/document/d/1m1GydyB8HwR9NcNqwkXY43FKa1gjzwFjLB0TSjX4F2k',
  'food': 'https://docs.google.com/document/d/18MD9YFt5loATNneC3PBnymHPE1Hq3YS7B_ulBKw2_WM',
  'hitler': 'https://docs.google.com/document/d/1azmf2gQJSWicyK11VMbo0Jhm0qO4ic_Xc8UbQA2ab40',
  'humane': 'https://docs.google.com/document/d/1jHiGcCqMjw6sqO-IRFvJIfRxyXTBkKG7AfUEcJH1-bo',
  'natural': 'https://docs.google.com/document/d/1ytYS0H8kMYLJ_BGTURljmAWRCML0vN6jqojnalpBYR4',
  'notmuch': 'https://docs.google.com/document/d/1hkkgjJtb_olKFuwYFkDa5mY-ETrWpSZhH5_972cbNYk',
  'plants': 'https://docs.google.com/document/d/1qY0AYX-tssme1whQiAZUCeqLYlcxnKYKrx2zJCGagTc',
  'preachy': 'https://docs.google.com/document/d/14KlrBYa4zj-_xPIDZJgdKYAfm9ePqoCHCiMPId7u4Pg',
  'protein': 'https://docs.google.com/document/d/10cM08wtBxl4go5YsIGe583ki4gVKYxdpbM7T44DdRjo',
  'teeth': 'https://docs.google.com/document/d/1bKiqjpMpOolKqyiBtnTnFYpiLyRgNsFcG0GP6XaJTug',
  'what': 'https://docs.google.com/document/d/15UtzLUgmlHMUsPR2x15RXpf-0GEBQGJ096JCjMc2z68'
};

/**
 * Download markdown content from a Google Docs URL
 */
function downloadDocToFile(url, destPath, maxRedirects = 10) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : require('http');

    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        if (maxRedirects === 0) {
          reject(new Error('Too many redirects'));
          return;
        }
        const redirectUrl = res.headers.location;
        if (!redirectUrl) {
          reject(new Error('Redirect without location header'));
          return;
        }
        res.resume(); // discard response body
        downloadDocToFile(redirectUrl, destPath, maxRedirects - 1).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download (${res.statusCode}): ${url}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        data = data.replace(/\r/g, '').replace(/\\!/g, '!');
        fs.writeFileSync(destPath, data, 'utf8');
        resolve();
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

function downloadDoc(url, destPath) {
  const exportUrl = `${url}/export?format=markdown`;
  return downloadDocToFile(exportUrl, destPath);
}

/**
 * Parse markdown content and extract sections based on top-level headings
 * Returns an array of {heading, content} objects
 */
function parseContent(text) {
  const sections = {};
  const lines = text.split('\n');
  
  let currentHeading = null;
  let currentContent = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check if this is a top-level heading (starts with single #)
    if (trimmed.startsWith('# ')) {
      // Save previous section if exists
      if (currentHeading !== null) {
        sections[currentHeading.toLowerCase()] = currentContent.join('\n').trim();
      }
      
      // Start new section - remove the '# ' prefix
      currentHeading = trimmed.substring(2);
      currentContent = [];
    } else if (currentHeading !== null) {
      // Add content to current section (skip empty lines at start, preserve them within)
      if (currentContent.length > 0 || trimmed.length > 0) {
        currentContent.push(line);
      }
    }
  }
  
  // Save last section
  if (currentHeading !== null) {
    sections[currentHeading.toLowerCase()] = currentContent.join('\n').trim();
  }
  
  return sections;
}

/**
 * Convert markdown to HTML
 */
function textToHtml(markdown) {
  if (!markdown || markdown.trim().length === 0) {
    return '';
  }
  
  // Parse markdown to HTML
  const html = marked.parse(markdown, { 
    breaks: true,
    gfm: true 
  });
  
  return html.trim();
}

/**
 * Generate JavaScript module content from parsed sections
 */
function generateModule(sections) {
  // Expected structure: first section is heading, second is alternatives,
  // third is short answer, rest is long answer
  const heading = sections.heading || 'heading';
  const alternatives = sections['alternative headings'] || '';
  const shortAnswer = sections['short answer'] || '';
  const longAnswer = sections['long answer'] || '';
  
  return `
const heading = \`${heading}\`;

const alternatives = \`${alternatives}\`;

const short_answer = \`${textToHtml(shortAnswer)}\`;

const long_answer = \`${textToHtml(longAnswer)}\`;

export {
 heading, alternatives, short_answer, long_answer,
};
`;
}

/**
 * Extract heading and body from parsed markdown content.
 * The first H1 becomes the page heading; everything else is body HTML.
 */
function generatePageJsx(name, pageConfig, markdownText) {
  // Split off the first H1 line as the heading
  const lines = markdownText.split('\n');
  let heading = name;
  let bodyLines = lines;

  const h1Index = lines.findIndex(l => l.trimStart().startsWith('# '));
  if (h1Index !== -1) {
    heading = lines[h1Index].trimStart().replace(/^#\s+/, '').trim();
    bodyLines = lines.slice(h1Index + 1);
  }

  const bodyHtml = marked.parse(bodyLines.join('\n'), { breaks: true, gfm: true }).trim();
  // Escape backticks and ${} in the HTML for safe template literal embedding
  const escapedHtml = bodyHtml.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

  return `import * as React from 'react';
${pageConfig.iconImport}
import InfoPage from './InfoPage';

const content = \`${escapedHtml}\`;

export default function ${name}() {
  return (
    <InfoPage icon={<${pageConfig.icon} fontSize="large"/>} heading="${heading}">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </InfoPage>
  );
}
`;
}

const RAW_DOCS_DIR = path.join(__dirname, '..', 'tmp', 'raw-docs');

/**
 * Main function to process all sections
 */
async function main() {
  const args = process.argv.slice(2);
  const debugMode = args.includes('--debug') || args.includes('-d');
  const parseOnly = args.includes('--parse-only') || args.includes('-p');
  const outputDir = args.find(arg => !arg.startsWith('-'));
  
  if (!outputDir || !fs.existsSync(outputDir)) {
    console.error('Usage: node download-docs.js <output-directory> [--debug] [--parse-only]');
    console.error('Example: node download-docs.js src/sections');
    console.error('         node download-docs.js src/sections --debug');
    console.error('         node download-docs.js src/sections --parse-only');
    process.exit(1);
  }
  
  // Pages output dir is the parent of the sections output dir (e.g. src/ when sections is src/sections)
  const pagesOutputDir = path.dirname(outputDir);
  
  if (debugMode) {
    console.log('Debug mode enabled - files will not be written\n');
  }

  if (parseOnly) {
    if (!fs.existsSync(RAW_DOCS_DIR)) {
      console.error(`Error: raw-docs directory not found at ${RAW_DOCS_DIR}`);
      console.error('Run without --parse-only first to download the raw files.');
      process.exit(1);
    }
    const firstSection = Object.keys(sections)[0];
    const firstFile = path.join(RAW_DOCS_DIR, `${firstSection}.md`);
    if (!fs.existsSync(firstFile)) {
      console.error(`Error: expected raw file not found: ${firstFile}`);
      console.error('Run without --parse-only first to download the raw files.');
      process.exit(1);
    }
    console.log('Parse-only mode - skipping download, reading from raw-docs/\n');
  } else {
    // Ensure the raw-docs temp directory exists
    if (!fs.existsSync(RAW_DOCS_DIR)) {
      fs.mkdirSync(RAW_DOCS_DIR, { recursive: true });
    }
  }
  
  console.log(`Processing ${Object.keys(sections).length} sections...`);
  
  for (const [name] of Object.entries(sections)) {
    try {
      const rawPath = path.join(RAW_DOCS_DIR, `${name}.md`);

      if (!parseOnly) {
        console.log(`Downloading ${name}...`);
        await downloadDoc(sections[name], rawPath);
        console.log(`  Saved raw to ${rawPath}`);
      } else {
        console.log(`Parsing ${name} from disk...`);
      }

      const text = fs.readFileSync(rawPath, 'utf8');

      // Parse the content
      const parsed = parseContent(text);
      
      // Generate the JavaScript module
      const moduleContent = generateModule(parsed);
      
      if (debugMode) {
        console.log(`\n--- ${name}.js preview ---`);
        console.log(moduleContent.substring(0, 1000) + '...\n');
        console.log(`✓ ${name}.js processed (not written)`);
      } else {
        // Write to file
        const outputPath = path.join(outputDir, `${name}.js`);
        fs.writeFileSync(outputPath, moduleContent, 'utf8');
        console.log(`✓ ${name}.js created`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${name}:`, error.message);
    }
  }
  
  console.log(`\nProcessing ${Object.keys(pages).length} pages...`);

  const RAW_PAGES_DIR = path.join(__dirname, '..', 'tmp', 'raw-pages');
  if (!parseOnly && !fs.existsSync(RAW_PAGES_DIR)) {
    fs.mkdirSync(RAW_PAGES_DIR, { recursive: true });
  }

  for (const [name, pageConfig] of Object.entries(pages)) {
    try {
      const rawPath = path.join(RAW_PAGES_DIR, `${name}.md`);

      if (!parseOnly) {
        console.log(`Downloading page ${name}...`);
        await downloadDoc(pageConfig.url, rawPath);
        console.log(`  Saved raw to ${rawPath}`);
      } else {
        console.log(`Parsing page ${name} from disk...`);
      }

      const text = fs.readFileSync(rawPath, 'utf8');
      const jsxContent = generatePageJsx(name, pageConfig, text);

      if (debugMode) {
        console.log(`\n--- ${name}.jsx preview ---`);
        console.log(jsxContent.substring(0, 1000) + '...\n');
        console.log(`✓ ${name}.jsx processed (not written)`);
      } else {
        const outputPath = path.join(pagesOutputDir, `${name}.jsx`);
        fs.writeFileSync(outputPath, jsxContent, 'utf8');
        console.log(`✓ ${name}.jsx created`);
      }
    } catch (error) {
      console.error(`✗ Error processing page ${name}:`, error.message);
    }
  }

  console.log('\nDone!');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
