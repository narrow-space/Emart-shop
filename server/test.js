const fs = require('fs');
const path = require('path');

const directory = './categoryuploads';
const filename = 'test.txt';
const filePath = path.join(directory, filename);

// Write a test file to the directory
fs.writeFile(filePath, 'Test content', (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File written successfully:', filePath);
    }
});