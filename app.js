const express=require("express")
const app=express()
const path=require("path")
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")))

app.listen(3000,()=>console.log("servidor geekco levantado al puerto 3000"))

app.get("/registro",function(req,res){
    res.sendFile(path.join(__dirname,"./views/registro.html"))
})

app.post("/registro",(req,res)=>{
    console.log(req.body)
    res.redirect("/");
})