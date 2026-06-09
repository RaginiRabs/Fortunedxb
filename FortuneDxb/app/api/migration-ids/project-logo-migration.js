import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

// ========== CONFIG ==========
const OLD_LOGO_ROOT =
  'C:/Users/DELL/Desktop/Rabs_Ragini/FortuneDxb Backup/fortunedxb.com/fortunedxb.com/img/logo';

const NEW_UPLOAD_ROOT = path.join(process.cwd(), '../../../public/uploads');

const dbConfig = {
  old: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fortunedxb_db',
  },
  new: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fortunedxb_db_latest',
  },
};

// ========== HELPERS ==========
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getLogoFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  // Only take files that include '-logo' in their name, ignore favicon
  return fs.readdirSync(dir).filter(f => f.toLowerCase().includes('-logo'));
}

// ========== MAIN ==========
async function migrateProjectLogo() {
  const oldDb = await mysql.createConnection(dbConfig.old);
  const newDb = await mysql.createConnection(dbConfig.new);

  try {
    console.log('Starting Project Logo Migration...\n');

    // const [projects] = await oldDb.query(`
    //   SELECT p_id, p_name
    //   FROM project_details
    //   ORDER BY p_id ASC
    //   LIMIT 25
    // `);
    const selectedIds = [1479, 1478, 1473, 1501, 1472, 1475, 1404, 1435, 1461, 1462, 1434, 1471, 1477, 1485];

    const [projects] = await oldDb.query(`
        SELECT p_id, p_name
        FROM project_details
        WHERE p_id IN (?)
        ORDER BY p_id ASC
      `, [selectedIds]);


    console.log(`Found ${projects.length} projects to migrate\n`);

    let successCount = 0;
    let notFoundCount = 0;
    let errorCount = 0;

    for (const project of projects) {
      const projectId = project.p_id;
      const projectName = project.p_name;

      try {
        console.log(`Processing Project ${projectId}: ${projectName}`);

        const logoFolder = path.join(OLD_LOGO_ROOT, projectName);
        const logoFiles = getLogoFiles(logoFolder);

        if (!logoFiles.length) {
          console.log(`No logo file found`);
          notFoundCount++;
          continue;
        }

        // Ensure main ProjectLogo folder exists
        ensureDir(path.join(NEW_UPLOAD_ROOT, 'ProjectLogo'));

        // Take the first logo file found
        const file = logoFiles[0];
        const oldPath = path.join(logoFolder, file);
        const ext = path.extname(file);
        const timestamp = Date.now();
        const filename = `projectlogo-${projectId}-${timestamp}${ext}`;

        const newPath = path.join(NEW_UPLOAD_ROOT, 'ProjectLogo', filename);

        // Copy file
        fs.copyFileSync(oldPath, newPath);

        const relativePath = `uploads/ProjectLogo/${filename}`;

        //FIXED: Update project_details table instead of project_files
        await newDb.query(
          `UPDATE project_details 
           SET project_logo = ?
           WHERE project_id = ?`,
          [relativePath, projectId]
        );

        console.log(`Logo saved: ${relativePath}`);
        successCount++;

      } catch (err) {
        console.log(`Error: ${err.message}`);
        errorCount++;
      }
    }

    console.log('\n========== MIGRATION SUMMARY ==========');
    console.log(`Success: ${successCount}`);
    console.log(`No Logo Found: ${notFoundCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Total Processed: ${projects.length}`);
    console.log('=======================================\n');

  } catch (err) {
    console.error('💥 Fatal Error:', err.message);
  } finally {
    await oldDb.end();
    await newDb.end();
  }
}

migrateProjectLogo();