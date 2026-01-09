import fs from 'fs';
const log = (msg) => {
    fs.appendFileSync('server_debug_wrapper.log', msg + '\n');
}
log('Wrapper starting');

try {
    await import('./server.js');
} catch (e) {
    log('Import failed: ' + e.stack);
}
