const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "/public")));

app.listen(3000, () => console.log("servidor geekco levantado al puerto 3000"));

app.get("/registro", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/register.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/login.html"));
});

app.get("/detalles", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/productDetail.html"));
});

app.get("/carrito", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/productCart.html"));
});

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname+"/views/index.html"))
})
<<<<<<< HEAD
=======


app.get("/footer",function(req,res){
    res.sendFile(path.join(__dirname+"/views/footer.html"))
})
>>>>>>> carrito
