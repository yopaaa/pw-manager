import express from 'express';
import dotenv from 'dotenv'; dotenv.config();
import readFileData from "../../src/js/readFileData.js";
import "dotenv/config";



const Api = express.Router();
const __dirname = process.env.PWD;


Api.get('/',(req,res)=>{
    readFileData((data)=>{
        // res.status(400)
        res.send({
          data: data.data,
          path: __dirname,
          ip: req.ip,
        })
      })
})

Api.get('/find/:id',(req,res)=>{
  readFileData((data)=>{
    // res.status(400)
    res.send({
      data: data.find(req.params.id),
      path: __dirname,
      ip: req.ip,
    })
  })
})

Api.get('/search',(req,res)=>{
  const result = []
  let query 
  if (req.query.q) {
    query = req.query.q.toLowerCase()
  }

  readFileData((data)=>{
    data.read.forEach(element => {
      if (element.key.includes(query)) {
        result.push(element)
      }
    });
    res.send({
      data: result,
      path: __dirname,
      ip: req.ip,
    })
  })
})

Api.use((req,res)=>{
    res.status(404)
    res.send({
      code:404,
      status: 'not found'
    })
})


export default Api;