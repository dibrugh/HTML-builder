const path = require('path');
const fs = require('fs');

const { stdin, stdout, exit } = process;
const filePath = path.join(__dirname, 'destination.txt');

const output = fs.createWriteStream(filePath);

stdout.write('Введите ваш текст\n');
stdin.on('data', chunk => {
    const dataStringified = chunk.toString();
    if (dataStringified.includes('exit')) {
        process.exit();
    } else {
        output.write(chunk);
    }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Редактирование завершено!'));

