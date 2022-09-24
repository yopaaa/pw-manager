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

    backup: function(Namefile) {
        const fileName = moment().format("Do-MMM-YY");

        readFileData((data) => {
            const dataJSON = JSON.stringify(data.read, null, '     ');
            fs.writeFile(`./data/backup/${fileName}.json`,dataJSON,err=>{
                if(err)throw err 
                Namefile(fileName)
            })
        })
    },

    delFile: function(path){
         fs.unlink(path,(err)=>{
           
         })
    },

};


export { myFunction }