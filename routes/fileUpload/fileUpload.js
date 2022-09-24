import express from 'express';
import fileUpload from 'express-fileupload';
import readFileData from '../../src/js/readFileData.js';
import {myFunction} from '../../src/js/myFunction.js';
import fs from 'fs';
import 'dotenv/config';



const __dirname = process.env.PWD;
const Uploads = express.Router();


Uploads.use(fileUpload());


Uploads.post('/restore', function(req, res) {
  const File = req.files.restore;
  const fileName = `${Date.now()}${File.name}`
  const uploadPath = __dirname + '/data/restore/' + fileName;

  // CHECK APAKAH FILE TERSEBUT JSON ATAU BUKAN
  if (File.mimetype !== 'application/json') {
    res.redirect('/file_incorect')  //JIKA BUKAN MAKA TIDAK AKAN DI PROSES
  }else{
    File.mv(uploadPath, (err) => {

      if (err) res.status(500).send(err);

      readFileData((data)=>{
         const DataRestore = JSON.parse( fs.readFileSync(`./data/restore/${fileName}`))

         try {
           DataRestore.forEach(element => {
            let checkData = data.find(element.id)
          
            if ( checkData == undefined) {
              data.create(element)
            }
           })
         }catch(err){
          myFunction.delFile(`./data/restore/${fileName}`)
         }finally{
          myFunction.delFile(`./data/restore/${fileName}`)
         }
         
        myFunction.addNewData('./data/password.json',data.read)
      })
      
      res.redirect('/')
    })
  }
  
})

export default Uploads
