import express from 'express';
import 'dotenv/config';
import {myFunction} from './src/js/myFunction.js';
import LogASCIIText from './src/js/ASCIIArt.js'
import readFileData from './src/js/readFileData.js';
import Uploads from './routes/fileUpload/fileUpload.js';



const app = express();
const __dirname = process.env.PWD;


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));
app.use('/upload',Uploads)


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
    myFunction.backup((Namefile)=>{
      res.download(`./data/backup/${Namefile}.json`, `My_password${Date.now()}.json`, (err) => {
        if (err) {
          res.redirect('/404')
        }
      })
    })
})

// 404
app.use('/',(req,res)=>{
  res.status(404)
  res.send('<center><a href="/"><h1 style="font-size:300px;">404</h1></a></center>')
})


app.listen(process.env.MAIN_PORT,process.env.MAIN_HOST,()=>{
  LogASCIIText('RILL CUY')
})
