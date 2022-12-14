import _ from 'lodash';
import moment from 'moment';
import { nanoid } from 'nanoid';
import chalk from 'chalk';


class dataMethod{
    constructor(data){
       this.data = data
    }

    // CREATE
    create(obj = Object){
      const newData = {};
      const {user_name,email,site,notes} = obj
      const Objkey = Object.keys(obj)

      
      Objkey.forEach( (Objkey) => {
        newData[Objkey] = obj[Objkey]
      });

      newData.id = nanoid(20)
      newData.create_time = Date.now()
      if (!newData.key) {
        let keys = `${user_name} ${email} ${site} ${notes}`
        newData.key = keys.toLowerCase()
      }
      
      this.data.push(newData)
    }

    // UPDATE
    update(id = String,data= Object){
      const  q = this.data.findIndex(arr => arr.id === id )
      const keys = `${data.user_name} ${data.email} ${data.site} ${data.notes}`
      const Objkey = Object.keys(data)

      Objkey.forEach( (Objkey) => {
        this.data[q][Objkey] = data[Objkey]
      });
      this.data[q].last_edited = Date.now()
      this.data[q].key = keys.toLowerCase()

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




