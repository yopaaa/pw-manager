import express from 'express';
import 'dotenv/config';
import {myFunction} from './js/function/myFunction.js';
import LogASCIIText from './js/function/ASCIIArt.js'
import readFileData from './js/readFileData.js';


const app = express();
const __dirname = process.env.PWD;


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));


app.get('/', (req,res) => {
    readFileData((data)=>{
        
        res.render('home',{
        page_title: 'Password_manager',
        data: data.read,
        path: __dirname,
        ip: req.ip,
      })
    })
})

app.get('/actions', (req,res) => {
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

app.post('/new',(req,res)=>{
    readFileData((data) => {
        data.create(req.body)
        myFunction.addNewData('./data/password.json',data.read)
        res.redirect('/')
    })
})

app.post('/change_data',(req,res)=>{
  readFileData((data) => {
      const userID = req.body.id;
      const edited_data = req.body
      
      data.update(userID,edited_data)

      myFunction.addNewData('./data/password.json',data.read)
      res.redirect('/')
  })
})

app.post('/backup',(req,res)=>{
    myFunction.backup()
    res.redirect('/')
})



app.listen(process.env.MAIN_PORT,process.env.MAIN_HOST,()=>LogASCIIText('RILL CUY'))
