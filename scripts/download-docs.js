#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

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
function downloadDoc(url) {
  return new Promise((resolve, reject) => {
    const exportUrl = `${url}/export?format=md`;
    
    https.get(exportUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${res.statusCode}`));
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Remove carriage returns
        data = data.replace(/\r/g, '');
        resolve(data);
      });
    }).on('error', reject);
  });
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
    } else if (currentHeading !== null && trimmed.length > 0) {
      // Add content to current section (skip empty lines at start)
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
  const heading = sections.heading || 'Heading';
  const alternatives = sections['alternative headings'] || '';
  const shortAnswer = sections['short answer'] || '';
  const longAnswer = sections['long answer'] || '';
  
  return `// This appears under the pictures on the square, and at the top of its
// individual page.
// Format: Text.
const heading = \`${heading}\`;


// These are the alternative questions/acceptable statements at the top of the
// individual page.
// Format: Text.
const alternatives = \`${alternatives}\`;


// This is the short section at the top of the individual page.
// Format: HTML.
const short_answer = \`${textToHtml(shortAnswer)}\`;


// This is the body of the individual page, use HTML liberally.
// Format: HTML.
const long_answer = \`
${textToHtml(longAnswer)}
\`;


export {
 heading, alternatives, short_answer, long_answer,
};
`;
}

/**
 * Main function to process all sections
 */
async function main() {
  const outputDir = process.argv[2];
  
  if (!outputDir || !fs.existsSync(outputDir)) {
    console.error('Usage: node download-docs.js <output-directory>');
    console.error('Example: node download-docs.js src/sections');
    process.exit(1);
  }
  
  console.log(`Downloading and processing ${Object.keys(sections).length} sections...`);
  
  for (const [name, url] of Object.entries(sections)) {
    try {
      console.log(`Processing ${name}...`);
      
      // Download the document
      const text = await downloadDoc(url);
      
      // Parse the content
      const parsed = parseContent(text);
      
      // Generate the JavaScript module
      const moduleContent = generateModule(parsed);
      
      // Write to file
      const outputPath = path.join(outputDir, `${name}.js`);
      fs.writeFileSync(outputPath, moduleContent, 'utf8');
      
      console.log(`✓ ${name}.js created`);
    } catch (error) {
      console.error(`✗ Error processing ${name}:`, error.message);
    }
  }
  
  console.log('Done!');
}

main().catch(console.error);
