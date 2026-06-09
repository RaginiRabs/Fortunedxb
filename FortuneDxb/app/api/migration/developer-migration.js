const mysql = require('mysql2/promise');

const config = {
  old: {
    host: 'localhost',
    user: 'root',
    password: '',  
    database: 'fortunedxb_db'
  },
  new: {
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'fortunedxb_db_new'
  }
};

async function addMissingDevelopers() {
  const oldDb = await mysql.createConnection(config.old);
  const newDb = await mysql.createConnection(config.new);

  try {
    console.log('Fetching unique builders from old database...\n');

    // Old से सब unique builders + उनका count
    const [builders] = await oldDb.query(
      `SELECT DISTINCT p_builder, COUNT(*) as total_projects
       FROM project_details 
       GROUP BY p_builder 
       ORDER BY p_builder`
    );

    console.log(`Found ${builders.length} unique builders\n`);

    // New में existing developers
    const [existing] = await newDb.query(
      `SELECT name FROM developers`
    );
    const existingNames = existing.map(e => e.name.toLowerCase());

    let addedCount = 0;
    let duplicateCount = 0;

    // Check कौन missing हैं
    for (let builder of builders) {
      const builderName = builder.p_builder;
      const totalProjects = builder.total_projects;
      
      // Capitalize function
      const capitalized = builderName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      if (!existingNames.includes(capitalized.toLowerCase())) {
        try {
          // Add करो with total_projects count
          await newDb.query(
            `INSERT INTO developers (name, is_verified, total_projects) 
             VALUES (?, 1, ?)`,
            [capitalized, totalProjects]
          );
          addedCount++;
          console.log(`Added: ${builderName} → ${capitalized} (Projects: ${totalProjects})`);
          
          // नया developer existing list में add कर दो
          existingNames.push(capitalized.toLowerCase());
        } catch (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            duplicateCount++;
            console.log(`Duplicate: ${capitalized} already exists (skipped)`);
          } else {
            throw error;
          }
        }
      } else {
        // Update करो existing developer का count
        await newDb.query(
          `UPDATE developers 
           SET total_projects = ? 
           WHERE LOWER(name) = ?`,
          [totalProjects, capitalized.toLowerCase()]
        );
        console.log(`Updated: ${capitalized} (Projects: ${totalProjects})`);
      }
    }

    console.log(`\nSummary:`);
    console.log(`Added: ${addedCount}`);
    console.log(`Updated: ${builders.length - addedCount - duplicateCount}`);
    console.log(` Duplicates skipped: ${duplicateCount}`);

    // Final count
    const [final] = await newDb.query(
      `SELECT COUNT(*) as count, SUM(total_projects) as total_projects 
       FROM developers`
    );
    
    console.log(`\nProcess Complete!`);
    console.log(`Total developers: ${final[0].count}`);
    console.log(`Total projects: ${final[0].total_projects}`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await oldDb.end();
    await newDb.end();
  }
}

addMissingDevelopers();