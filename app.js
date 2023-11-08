const express=require("express")
const app=express()
const path=require("path")

app.use(express.static(path.join(__dirname,"public")))

app.listen(3000,()=>console.log("servidor geekco levantado al puerto 3000"))

app.get("/",function(req,res){
    res.send("hola")
})

app.get("/login",function(req,res){
    res.sendFile(path.join(__dirname, "./views/login.html"));
})