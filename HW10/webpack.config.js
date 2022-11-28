const path = require('path');

module.exports = {
    mode: 'development',
    entry: './example/index.js',
    output: {
        path: path.resolve(__dirname, 'example', 'build'),
        filename: 'example.js',
    }
}