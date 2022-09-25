import express from 'express';
import 'dotenv/config';
import LogASCIIText from './src/js/ASCIIArt.js'
import readFileData from './src/js/readFileData.js';
import Actions from './routes/Actions/Actions.js';



const app = express();
const __dirname = process.env.PWD;


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));
app.use('/actions',Actions)


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

// 404
app.use('/',(req,res)=>{
  res.status(404)
  res.send('<center><a href="/"><h1 style="font-size:300px;">404</h1></a></center>')
})


app.listen(process.env.MAIN_PORT,process.env.MAIN_HOST,()=>{
  LogASCIIText('RILL CUY')
})
