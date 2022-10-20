import moment from 'moment';
import fs from 'fs';
import check_data_dir from './check_data_dir.js';
import readFileData from './readFileData.js';



const myFunction = {

    addNewData: function(path,data) {
        const dataJSON = JSON.stringify(data, null, '     ');
        fs.writeFile(path, dataJSON, err => {
            if(err) throw err;
        });
    },

    delFile: function(path){
         fs.unlink(path,(err)=>{
           if (err) console.log(err)
         })
    },

};


export { myFunction }