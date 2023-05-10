const path = require('path');
const fs = require('fs');
const { stat } = require('fs/promises');
const { readdir } = require('fs/promises');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
    if (err) {
        throw err;
    }
    for (let file of files) {
        const filePath = path.join(folderPath, file);
        fs.stat(filePath, (err, stats) => {
        if (err) {
            throw err;
        }
        if (stats.isFile()) {
            const fileName = path.parse(file).name;
            const fileExt = path.extname(file).replace('.', '');
            const fileSize = stats.size / 1024;
            console.log(fileName + ' - ' + fileExt + ' - ' + fileSize + ' kb');
            }
        });
    }});


