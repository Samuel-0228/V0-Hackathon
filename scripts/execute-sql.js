import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeSqlFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf-8');
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt && !stmt.startsWith('--'));

    console.log(`Executing ${path.basename(filePath)}...`);
    
    for (const statement of statements) {
      if (statement) {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        if (error) {
          console.error('Error executing statement:', statement.substring(0, 50), error);
        }
      }
    }
    
    console.log(`✓ Completed ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
  }
}

async function main() {
  try {
    // Execute schema creation
    await executeSqlFile(path.join(process.cwd(), 'scripts/01-create-schema.sql'));
    
    // Execute seed data
    await executeSqlFile(path.join(process.cwd(), 'scripts/02-seed-data.sql'));
    
    console.log('✓ All SQL scripts executed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
