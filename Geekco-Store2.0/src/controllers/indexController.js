
const { log } = require("console");
const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname,"../database/products.json"),"utf-8")
const products = JSON.parse(json);

const indexController = {
    home: (req,res)=>{
 const json = fs.readFileSync(path.join(__dirname,"../database/products.json"),"utf-8")
const products = JSON.parse(json);
        res.render("index",{products})
    },
    search: (req,res)=>{
        let {keywords} = req.query;
        const search = [];
        products.forEach(product => {
            if(product.name.toLowerCase().includes(keywords.toLowerCase())){
                search.push(product)
            }
        });
        console.log(search);
        res.render("results",{search,keywords})
    }
}

module.exports = indexController;