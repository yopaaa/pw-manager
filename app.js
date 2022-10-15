// MODULE IMPORT
import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';


//FUNCTION IMPORT
import LogASCIIText from './src/js/ASCIIArt.js'
import authentication from './routes/login/authentication.js';

// ROUTE IMPORT
import Actions from './routes/Actions/Actions.js';
import Api from './routes/Api/api.js';
import login from './routes/login/login.js';




const app = express();
const __dirname = process.env.PWD;
const host = process.env.MAIN_HOST
const port = process.env.MAIN_PORT


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(__dirname + "/public"))

app.use('/actions',authentication,Actions)
app.use('/api',authentication,Api)
app.use('/login',login)



app.get('/',authentication,(req,res) => {
    res.render('home',{
      page_title: 'Password_manager',
      path: __dirname,
      ip: req.ip,
    })
})

// 404
app.use('/',(req,res)=>{
  res.status(404)
  res.send('<center><a href="/"><h1 style="font-size:300px;">404</h1></a></center>')
})


app.listen(port,host,()=>{
  LogASCIIText('RILL CUY')
})
