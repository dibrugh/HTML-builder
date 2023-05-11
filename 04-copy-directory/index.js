const path = require('path');
const { mkdir, rm, copyFile, readdir } = require('fs/promises');
const fs = require('fs');

const folderPath = path.join(__dirname, 'files');
const folderCopiedPath = path.join(__dirname, 'files-copy');

const copyDir = () => {
    fs.stat(folderCopiedPath, (err) => {
        if (!err) {
            fs.rm(folderCopiedPath, { recursive: true }, (err) => {
                if (err) throw err;
                copyFiles();
            });
        } else {
            copyFiles();
        }
    });
}


const copyFiles = () => {
    fs.mkdir(folderCopiedPath, { recursive: true, force: true }, (err) => {
        if (err) {
            throw err;
        }

        fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
            if (err) {
                throw err;
            }

            for (let file of files) {
                fs.copyFile(path.join(folderPath, file.name), path.join(folderCopiedPath, file.name), (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        })

    });
}

copyDir();