import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

// ================= CONFIG =================
const OLD_GALLERY_ROOT =
  'C:/Users/DELL/Desktop/Rabs_Ragini/FortuneDxb Backup/fortunedxb.com/fortunedxb.com/img/gallery';
const OLD_SLIDER_ROOT =
  'C:/Users/DELL/Desktop/Rabs_Ragini/FortuneDxb Backup/fortunedxb.com/fortunedxb.com/img/slider';

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

// ================= HELPERS =================
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getAllImagesRecursive(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getAllImagesRecursive(fullPath));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

// ================= MAIN =================
async function migrateFirstTwoProjects() {
  const oldDb = await mysql.createConnection(dbConfig.old);
  const newDb = await mysql.createConnection(dbConfig.new);

  try {
    // Fetch first 25 projects from old DB
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

    for (const project of projects) {
      const projectId = project.p_id;
      const projectName = project.p_name;

      console.log(`\nProject ${projectId}: ${projectName}`);

      // Read gallery images
      const galleryFolder = path.join(OLD_GALLERY_ROOT, projectName);
      const sliderFolder = path.join(OLD_SLIDER_ROOT, projectName);

      const galleryImages = getAllImagesRecursive(galleryFolder);
      const sliderImages = getAllImagesRecursive(sliderFolder);

      // Merge gallery + slider
      const allImages = [...galleryImages, ...sliderImages];

      if (!allImages.length) {
        console.log(`No images found for project ${projectName}`);
        continue;
      }

      for (const oldImagePath of allImages) {
        const ext = path.extname(oldImagePath);
        const timestamp = Date.now();
        const filename = `gallery-${projectId}-${timestamp}${ext}`;

        const newImagePath = path.join(
          NEW_UPLOAD_ROOT,
          'Gallery',
          `gallery-${projectId}`,
          filename
        );

        ensureDir(path.dirname(newImagePath));
        fs.copyFileSync(oldImagePath, newImagePath);

        const relativePath = `uploads/Gallery/gallery-${projectId}/${filename}`;

        // Insert into project_files
        await newDb.query(
          `INSERT INTO project_files (project_id, file_name, file_type, file_path)
           VALUES (?, ?, 'gallery', ?)`,
          [projectId, filename, relativePath]
        );

        console.log(`Copied: ${relativePath}`);
      }
    }

    console.log('\nMigration SUCCESS gallery image for first 2 projects');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await oldDb.end();
    await newDb.end();
  }
}

migrateFirstTwoProjects();
