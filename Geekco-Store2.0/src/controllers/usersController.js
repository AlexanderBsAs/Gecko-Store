const usersController = {
    login: (req,res)=>{
        res.render("users/login")
    },
    userLogin: (req,res)=>{
        console.log(req.body);
        res.redirect("/")
    },
    register: (req,res)=>{
        res.render("users/register")
    },
    userRegister: (req,res)=>{
        console.log(req.body)
        res.redirect("/")
    }
}

module.exports = usersController;