import _ from 'lodash';
import moment from 'moment';
import { nanoid } from 'nanoid';
import chalk from 'chalk';


class dataMethod{
    constructor(data){
       this.data = data
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
       const result = this.data[q]
       if (result) {
        return this.data[q]
       } else {
        return {
          message:'someting wrong i can fell it',
          code:404
        }
       }
    }

    // DELETE
    delete(id){
        const  q = this.data.findIndex(arr => arr.id === id )
        const delData = this.data[q];
        console.log(chalk.red('DELETE'));
        console.log(delData);

        _.remove(this.data , (arr)=>{
          return arr.id === id;
          })
    }

    // READ
    get read(){
        return this.data
    }

}




export default dataMethod;




