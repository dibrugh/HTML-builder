const path = require("path")
const { mkdir, rm, copyFile, readdir } = require("fs/promises")

const folderPath = path.join(__dirname, 'files');
const folderCopiedPath = path.join(__dirname, 'files-copy');


async function copyFolder() {
    try {
        let files = await readdir(folderPath)
        for (let file of files) {
            copyFile(path.join(folderPath, file), path.join(folderCopiedPath, file))
        }
    } catch (err) {
        console.error('failed to copy')
    }
}

mkdir(folderCopiedPath, { recursive: true }).then((data) => {
    if (!data) {
        rm(folderCopiedPath, { recursive: true }).then((data) => {
            if (!data) {
                mkdir(folderCopiedPath, { recursive: true })
                copyFolder()
            }
        })
    } else {
        copyFolder()
    }
})