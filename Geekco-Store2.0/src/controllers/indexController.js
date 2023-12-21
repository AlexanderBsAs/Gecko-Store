
const fs = require("fs");
const path = require("path");
const json = fs.readFileSync(path.join(__dirname,"../database/products.json"),"utf-8")
const products = JSON.parse(json);

const indexController = {
    home: (req,res)=>{
        res.render("index",{products})
    },
    search: (req,res)=>{
        let {keywords} = req.query;
        let search = [];
        products.forEach(product => {
            if(product.name.toLowerCase() == keywords.toLowerCase()){
                search.push(product)
            }
        });
        res.render("results",{search,keywords})
    }
}

module.exports = indexController;