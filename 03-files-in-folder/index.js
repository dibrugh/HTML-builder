const path = require('path');
const fs = require('fs');
const { stat } = require('fs/promises');
const { readdir } = require('fs/promises');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
    if (err) {
        throw err;
    }
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        fs.stat(filePath, (err, stats) => {
        if (err) {
            throw err;
        }
        if (stats.isFile()) {
            let fileName = path.parse(file).name;
            let fileExt = path.extname(file).replace('.', '');
            const fileSize = stats.size / 1024;
            console.log(fileName + ' - ' + fileExt + ' - ' + fileSize + ' kb');
            }
        });
    });
});


