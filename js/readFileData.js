import dataMethod from './dataMethod.js';
import fs from 'fs';


function readFileData(callback = function(){}) {
    fs.readFile('./data/password.json','utf-8',(err, result) => {
       if(err) throw err;
       const datas = JSON.parse(result);
       const data = new dataMethod(datas);
       callback(data)
       }) 
}
 
    // console.log(datas.read);
    // console.log(datas.find('eBdKYGVvDuLQK8KhznzW'));
    // data.create({
    //     "id": "3",
    //     "name": "jona"
    // })
    //     datas.update('1',{name:'yopaaaaaa'})
    //     datas.delete('3')

export default readFileData;
