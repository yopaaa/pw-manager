import express from "express";
import fileUpload from "express-fileupload";
import chalk from 'chalk';
import readFileData from "../../src/js/readFileData.js";
import { myFunction } from "../../src/js/myFunction.js";
import fs from "fs";
import "dotenv/config";

const __dirname = process.env.PWD;
const Actions = express.Router();

Actions.use(fileUpload());


// RESTORE ROUTE
Actions.post("/restore", function (req, res) {
  if (req.files === undefined || req.files.restore === undefined) {
    res.redirect("/");
    console.log('no file restore');
  } else {

    const File = req.files.restore;
    const fileName = `${Date.now()}${File.name}`;
    const uploadPath = __dirname + "/data/" + fileName;

    // CHECK APAKAH FILE TERSEBUT JSON ATAU BUKAN
    if (File.mimetype !== "application/json") {
      console.log("file type incorrect : "+File.mimetype);
      res.redirect("/file_incorect"); //JIKA BUKAN MAKA TIDAK AKAN DI PROSES
    } else { //JIKA FILE YANG DI MASUKAN BENAR MAKA
      File.mv(uploadPath, (err) => {
        if (err) res.status(500).send(err);

        readFileData((data) => {
          try {
             const DataRestore = JSON.parse(
               fs.readFileSync(`./data/${fileName}`)
             );

            DataRestore.forEach((element) => {
              let checkData = data.find(element.id);

              if (checkData.code) {
                console.log(chalk.green('RESTORE ONE DATA'));
                data.create(element);
              }
            });
          } catch (error) {
            console.log('Someting wrong with this file');
            if (fs.existsSync(`./data/${fileName}`)) {
              myFunction.delFile(`./data/${fileName}`);
             }
          } finally {
             if (fs.existsSync(`./data/${fileName}`)) {
              myFunction.delFile(`./data/${fileName}`);
             }
            myFunction.addNewData("./data/password.json", data.read);
          }
        });

        res.redirect("/");
      });
    }
  }
});

// BACKUP ROUTE
Actions.post("/backup", (req, res) => {
  const fileName = req.body.fileName
  console.log(fileName);
  res.download(
    `./data/password.json`,
    `${fileName}.json`,
    (err) => {
      if (err) {
        throw err
        res.redirect("/404")
      };
    }
  );
});

// DELETE DATA ROUTE
Actions.post("/delete", (req, res) => {
  readFileData((data) => {
    const getActionID = data.find(req.body.id);

    if (getActionID.code) {
      res.redirect('/id_not_found')
    } else {
      data.delete(getActionID.id);
      myFunction.addNewData("./data/password.json", data.read);
      res.redirect("/");
    }
  });
});

// NEW DATA ROUTE
Actions.post("/new", (req, res) => {
  readFileData((data) => {
    data.create(req.body);
    myFunction.addNewData("./data/password.json", data.read);
    res.redirect("/");
  });
});

// UPDATE DATA ROUTE
Actions.post("/change_data", (req, res) => {
  readFileData((data) => {
    const userID = req.body.id;
    const edited_data = req.body;

    if (userID) {
     data.update(userID, edited_data);
     myFunction.addNewData("./data/password.json", data.read); 
    }
    
    res.redirect("/");
  });
});




export default Actions;
