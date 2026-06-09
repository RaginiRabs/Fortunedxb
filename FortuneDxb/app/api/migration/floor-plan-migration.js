import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

// ========== CONFIG ==========
const OLD_PLAN_ROOT =
  'C:/Users/DELL/Desktop/Rabs_Ragini/Fortunedxb Backup/fortunedxb.com/fortunedxb.com/img/plan';

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
    database: 'fortunedxb_db_new',
  },
};

// ========== HELPERS ==========
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getPlanFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp|pdf)$/i.test(f));
}

// ========== MAIN ==========
async function migrateFloorPlan() {
  const oldDb = await mysql.createConnection(dbConfig.old);
  const newDb = await mysql.createConnection(dbConfig.new);

  try {
    const [projects] = await oldDb.query(`
      SELECT p_id, p_name
      FROM project_details
      ORDER BY p_id ASC
      LIMIT 25
    `);

    for (const project of projects) {
      const projectId = project.p_id;
      const projectName = project.p_name;

      console.log(`\nProject ${projectId}: ${projectName}`);

      const planFolder = path.join(OLD_PLAN_ROOT, projectName);
      const planFiles = getPlanFiles(planFolder);

      if (!planFiles.length) {
        console.log(`No floorplan file found for project ${projectName}`);
        continue;
      }

      for (const file of planFiles) {
        const oldPath = path.join(planFolder, file);
        const ext = path.extname(file);
        const timestamp = Date.now();
        const filename = `floorplan-${projectId}-${timestamp}${ext}`;

        const newPath = path.join(
          NEW_UPLOAD_ROOT,
          'FloorPlan',
          `floorplan-${projectId}`,
          filename
        );

        ensureDir(path.dirname(newPath));
        fs.copyFileSync(oldPath, newPath);

        const relativePath = `uploads/FloorPlan/floorplan-${projectId}/${filename}`;

        await newDb.query(
          `INSERT INTO project_files (project_id, file_name, file_type, file_path)
           VALUES (?, ?, 'floorplan', ?)`,
          [projectId, filename, relativePath]
        );

        console.log(`Copied: ${relativePath}`);
      }
    }

    console.log('\nFloorplan migration SUCCESS for first 2 projects');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await oldDb.end();
    await newDb.end();
  }
}

migrateFloorPlan();
