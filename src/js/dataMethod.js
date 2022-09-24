import fs from 'fs';
import _ from 'lodash';
import {myFunction} from './myFunction.js';
import moment from 'moment';
import { nanoid } from 'nanoid';


class dataMethod{
    constructor(data){
       this.data = data
       this.delData = JSON.parse( fs.readFileSync('./data/delete.json'))
    }

    // CREATE
    create(obj={}){
      const newData = {};
      const Objkey = Object.keys(obj)

      newData.id = nanoid(20)
      Objkey.forEach( (Objkey) => {
        newData[Objkey] = obj[Objkey]
      });
      
      if (!newData.create_time) {
        newData.create_time = moment().format('MMM Do YY') 
      }
      newData.status = 'available'

 
      this.data.push(newData)
    }

    // UPDATE
    update(id = String,data= Object){
      const  q = this.data.findIndex(arr => arr.id === id )
      const Objkey = Object.keys(data)

      Objkey.forEach( (Objkey) => {
        this.data[q][Objkey] = data[Objkey]
      });
      this.data[q].last_edited = moment().format('MMMM Do YYYY, h:mm:ss a')

    }
  
    // FIND
    find(id){
       const  q = this.data.findIndex(arr => arr.id === id )
       return this.data[q]
    }

    // DELETE
    delete(id){
        const  q = this.data.findIndex(arr => arr.id === id )
        const delData = this.data[q];
        delData['status'] = 'not available'
        delData['delete'] = moment().format('MMM Do YY')
        
        this.delData.push(delData)
        _.remove(this.data , (arr)=>{
          return arr.id === id;
          })
        myFunction.addNewData('./data/delete.json',this.delData)
    }

    // READ
    get read(){
        return this.data
    }

}




export default dataMethod;




