// const fs = require('fs');
import fs from 'fs'


// check if directory exists
if (!fs.existsSync('./data')) {
    fs.mkdir('./data', err => 0)
    fs.mkdir('./data/backup', err => 0)
    fs.writeFile('./data/password.json','[]', err => 0);
    fs.writeFile('./data/delete.json','[]', err => 0);
} 

export default 0