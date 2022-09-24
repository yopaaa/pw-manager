// const fs = require('fs');
import fs from 'fs'


// check if directory exists
if (!fs.existsSync('./data')) {
    fs.mkdir('./data', err => 0)
}

if (!fs.existsSync('./data/backup')) {
    fs.mkdir('./data/backup', err => 0)
}

if (!fs.existsSync('./data/restore')) {
    fs.mkdir('./data/restore', err => 0)
}

if (!fs.existsSync('./data/password.json')) {
    fs.writeFile('./data/password.json','[]', err => 0);
}

if (!fs.existsSync('./data/delete.json')) {
    fs.writeFile('./data/delete.json','[]', err => 0);
}

export default 0