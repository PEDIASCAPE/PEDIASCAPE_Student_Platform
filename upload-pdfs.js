const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;
const BUCKET_NAME = process.env.SUPABASE_BUCKET || 'study-materials';
const PDF_FOLDER =
  process.env.PDF_FOLDER ||
  process.argv.find((arg) => arg.startsWith('--folder='))?.split('=')[1] ||
  path.join(__dirname, 'bulk_upload', 'pdfs');

const isDryRun = process.argv.includes('--dry-run');

function listPdfFiles(rootFolder) {
  const results = [];
  const stack = [rootFolder];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
        continue;
      }

      if (!entry.isFile()) continue;
      if (!entry.name.toLowerCase().endsWith('.pdf')) continue;

      results.push(entryPath);
    }
  }

  return results;
}

async function uploadPDFs() {
  try {
    if (!fs.existsSync(PDF_FOLDER)) {
      throw new Error(`PDF folder not found: ${PDF_FOLDER}`);
    }

    const pdfFiles = listPdfFiles(PDF_FOLDER);
    console.log(`Found ${pdfFiles.length} PDFs in: ${PDF_FOLDER}\n`);

    if (isDryRun) {
      for (const filePath of pdfFiles) {
        const relativePath = path.relative(PDF_FOLDER, filePath).replace(/\\/g, '/');
        console.log(`[dry-run] ${relativePath}`);
      }
      return;
    }

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error(
        'Missing Supabase config. Set SUPABASE_URL and SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY).'
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const isServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
    const email = process.env.SUPABASE_EMAIL;
    const password = process.env.SUPABASE_PASSWORD;

    if (!isServiceRole && email && password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(`Supabase auth failed: ${error.message}`);
    }

    let uploadedCount = 0;
    let failedCount = 0;

    for (const filePath of pdfFiles) {
      const relativePath = path.relative(PDF_FOLDER, filePath).replace(/\\/g, '/');
      const fileBuffer = fs.readFileSync(filePath);

      console.log(`Uploading: ${relativePath}...`);

      const { error } = await supabase.storage.from(BUCKET_NAME).upload(relativePath, fileBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'application/pdf',
      });

      if (error) {
        console.error(`Error uploading ${relativePath}: ${error.message}`);
        failedCount += 1;
        continue;
      }

      const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(relativePath);
      console.log(`Uploaded: ${relativePath}`);
      console.log(`Public URL: ${urlData.publicUrl}\n`);
      uploadedCount += 1;
    }

    console.log(`Upload finished. Uploaded: ${uploadedCount}, Failed: ${failedCount}`);
    if (failedCount > 0) process.exitCode = 1;
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exitCode = 1;
  }
}

uploadPDFs();
