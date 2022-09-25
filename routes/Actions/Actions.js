import express from 'express';
import fileUpload from 'express-fileupload';
import readFileData from '../../src/js/readFileData.js';
import {myFunction} from '../../src/js/myFunction.js';
import fs from 'fs';
import 'dotenv/config';


const __dirname = process.env.PWD;
const Actions = express.Router();


Actions.use(fileUpload());


Actions.post('/restore', function(req, res) {
  if(req.files === undefined || req.files.restore === undefined){
    res.redirect('/')
   }else{
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
   }
})

Actions.post('/backup',(req,res)=>{
  myFunction.backup((Namefile)=>{
    res.download(`./data/backup/${Namefile}.json`, `My_password${Date.now()}.json`, (err) => {
      if (err)res.redirect('/404')
      myFunction.delFile(`./data/backup/${Namefile}.json`)
    })
  })
})

Actions.get('/actions', (req,res) => {
  readFileData((data)=>{
    const getActionID = data.find(req.query.id)

    switch (req.query.action) {
      case 'form_edit':

          res.render('edit',{
            page_title: 'edit',
            data: getActionID,
          })
          break;

      case 'delete':
          data.delete(getActionID.id)
          myFunction.addNewData('./data/password.json',data.read)
          res.redirect('/')
          break;
    
      default:
          res.redirect('/')
          break;
    }  
  })
})

Actions.post('/new',(req,res)=>{
  readFileData((data) => {
      data.create(req.body)
      myFunction.addNewData('./data/password.json',data.read)
      res.redirect('/')
  })
})

Actions.post('/change_data',(req,res)=>{
readFileData((data) => {
    const userID = req.body.id;
    const edited_data = req.body
    
    data.update(userID,edited_data)

    myFunction.addNewData('./data/password.json',data.read)
    res.redirect('/')
})
})

export default Actions
