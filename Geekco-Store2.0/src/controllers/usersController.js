const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const usersController = {
  login: (req, res) => {
    if (res.locals.errors) {
      res.render("users/login", { errors: res.locals.errors });
    } else {
      res.render("users/login", { errors: [] });
    }
  },
  userLogin: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.locals.errors = errors.array();
      return res.render("users/login", { errors: res.locals.errors });
    }
    const json = fs.readFileSync(
      path.join(__dirname, "../database/users.json"),
      "utf-8"
    );
    const users = JSON.parse(json);
    const { email, password, remember } = req.body;
    const userLogged = users.find(
      (user) => user.email === email && user.password === password
    );
    if (remember) {
      res.cookie("remember", "true", { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie válida por 30 días
    }
    req.session.user = {
      email: userLogged.email,
      first_name: userLogged.first_name,
      last_name: userLogged.last_name,
    };
    res.locals.user = req.session.user;
    console.log(req.session.user);
    console.log("Usuario autenticado:", userLogged);
    res.redirect("/");
  },
  register: (req, res) => {
    res.render("users/register");
  },
  userRegister: (req, res) => {
    console.log(req.body);
    res.redirect("/");
  },
  userUpdateForm: (req, res) => {
    const usuarios = fs.readFileSync(
      path.join(__dirname, "../database/users.json"),
      "utf-8"
    );
    const users = JSON.parse(usuarios);

    const id = +req.params.id;
    const usuario = users.find((usuario) => usuario.id == id);
    console.log(usuario);
    res.render("users/userUpdate", {
      usuario,
      id,
    });
  },
  userUpdate: (req, res) => {
    try {
      const usuarios = fs.readFileSync(
        path.join(__dirname, "../database/users.json"),
        "utf-8"
      );
      const { first_name, last_name, adress } = req.body;
      const { id } = req.params;
      const users = JSON.parse(usuarios);
      const usuario = users.find((usuario) => usuario.id == id);
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        res.render("users/userUpdate", {
          usuario,
          id,
          errores: errores.mapped(),
        });
      } else {
        const userUpdate = {
          id: usuario.id,
          first_name,
          last_name,
          email: usuario.email,
          admin: usuario.admin,
          password: usuario.password,
          adress,
          image: usuario.image,
        };
        let usersList = users.map((elemento) => {
          if (elemento.id == id) {
            return userUpdate;
          } else {
            return elemento;
          }
        });
        let jsonUpdate = JSON.stringify(usersList);

        fs.writeFileSync(
          path.join(__dirname, "../database/users.json"),
          jsonUpdate,
          "utf-8"
        );
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  },

  updatePasswordForm: (req, res) => {
    const usuarios = fs.readFileSync(
      path.join(__dirname, "../database/users.json"),
      "utf-8"
    );
    const users = JSON.parse(usuarios);

    const id = +req.params.id;
    const usuario = users.find((usuario) => usuario.id == id);
    console.log(usuario);
    res.render("users/passwordUpdate", { usuario, id });
  },

  updatePassword: (req, res) => {
    try {
      const usuarios = fs.readFileSync(
        path.join(__dirname, "../database/users.json"),
        "utf-8"
      );
      const { password } = req.body;
      const { id } = req.params;
      const users = JSON.parse(usuarios);
      const usuario = users.find((usuario) => usuario.id == id);
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        res.render("users/passwordUpdate", {
          usuario,
          id,
          errores: errores.mapped(),
        });
        // res.send(errores.mapped());
      } else {
        const userUpdate = {
          id: usuario.id,
          first_name: usuario.first_name,
          last_name: usuario.last_name,
          email: usuario.email,
          admin: usuario.admin,
          password: bcrypt.hashSync(password, 10),
          adress: usuario.adress,
          image: usuario.image,
        };
        let usersList = users.map((elemento) => {
          if (elemento.id == id) {
            return userUpdate;
          } else {
            return elemento;
          }
        });
        let jsonUpdate = JSON.stringify(usersList);

        fs.writeFileSync(
          path.join(__dirname, "../database/users.json"),
          jsonUpdate,
          "utf-8"
        );
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = usersController;
