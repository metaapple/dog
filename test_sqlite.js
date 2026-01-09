import fs from 'fs';
import Database from 'better-sqlite3';
fs.writeFileSync('test_sqlite.log', 'Import success\n');
try {
    new Database('test.db');
    fs.appendFileSync('test_sqlite.log', 'DB success\n');
} catch (e) {
    fs.appendFileSync('test_sqlite.log', 'DB fail: ' + e.message + '\n');
}
