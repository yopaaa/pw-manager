import express from 'express';
import dotenv from 'dotenv'; dotenv.config();
import cookieParser from 'cookie-parser';
import "dotenv/config";




const login = express.Router();
const __dirname = process.env.PWD;
const admin_auth = {
    user_name: process.env.USER_NAME,
    password: process.env.AUTH_PASS,
}

login.use(express.urlencoded({ extended: true }))
login.use(cookieParser())


login.get('/', (req,res) => {
    res.render('login',{
      page_title: 'login',
      ip: req.ip,
    })
})
login.post('/', (req,res)=>{
  const token = {id:Date.now()}
  const data = req.body

  if (req.body.email == admin_auth.user_name && req.body.password == admin_auth.password) {
    token.data =  data
    res.cookie('token',token)
    res.redirect('/')
  }else{
    res.redirect('/login') 
  }
})

export default login;