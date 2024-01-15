const fs = require("fs");
const path = require("path")

const user ={
    fileName : "../database/users.json",
    getData: function (){
        return JSON.parse(fs.readFileSync(this.fileName,"utf-8"))
    },
    findAll: function (){
        return this.getData
    },
    findByFieldName: function (field,text){
        let allUsers =  this.findAll;
        let userFound = allUsers.find(element => element[field] === text)

    }
}