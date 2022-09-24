import express from 'express';
import dotenv from 'dotenv'; dotenv.config();


const api = express.Router();


api.get('/',(req,res)=>{
   
})
api.use((req,res)=>{
    res.send({name:'not found'})
})


export default api;