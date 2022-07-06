var express = require("express");
const User = require("./../models/User");
var router = express.Router();
const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");

// 0 - Require bcrypt
const bcrypt = require("bcrypt");
// 1 - Specify how many salt rounds
const saltRounds = 10;

// POST '/auth/signup'
exports.signUpController = (req, res, next) => {
  console.log("SISSADSADASDLKJ");
  // 2 - Destructure the password and username
  const { username, password } = req.body;
  if (username == undefined) {
    return res.status(200).json({ success: false });
  }

  // 3 - Check if the username and password are empty strings
  if (username === "" || password === "") {
    res.render("login", {
      successMessage: false,
      errorMessage: "Provide username and password.",
    });
    return;
  }

  // 4 - Check if the username already exists - if so send error

  User.findOne({ username })
    .then((user) => {
      // > If username exists already send the error
      if (user) {
        res.json({
          successMessage: false,
          errorMessage: "Username already exists.",
        });
        return;
      }

      // > If username doesn't exist, generate salts and hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // > Create the user in the DB
      User.create({ username, password: hashedPassword })
        .then((newUserObj) => {
          let jwtSecretKey = process.env.SESSION_SECRET;
          let data = {
            user_id: newUserObj._id,
            date: new Date(),
          };

          const token = jwt.sign(data, jwtSecretKey);
          // save user token

          res.json({ succes: true, token: token });
        })
        .catch((err) => {
          console.log(err);
          res.json({
            successMessage: false,
            errorMessage: err,
          });
        });

      // > Once the user is created , redirect to home
    })
    .catch((err) => console.log(err));
};

// POST 'auth/login'
exports.loginController = (req, res, next) => {
  // Deconstruct the password and the user
  const { username, password: enteredPassword } = req.body;

  // Check if username or password are empty strings
  if (username === "" || enteredPassword === "") {
    res.render("/login", {
      errorMessage: "Provide username and password",
      successMessage: false,
    });
    return;
  }
  // Find the user by username
  User.findOne({ username })
    .then((userData) => {
      // If - username doesn't exist - return error
      if (!userData) {
        res.render({
          successMessage: false,
          errorMessage: "Username not found!",
        });
        return;
      }

      // If username exists - check if the password is correct
      const hashedPasswordFromDB = userData.password; // Hashed password saved in DB during signup

      const passwordCorrect = bcrypt.compareSync(
        enteredPassword,
        hashedPasswordFromDB
      );

      // If password is correct - create session (& cookie) and redirect

      if (passwordCorrect) {
        // Save the login in the session ( and create cookie )
        // And redirect the user

        let jwtSecretKey = process.env.SESSION_SECRET;
        let data = {
          user_id: newUserObj._id,
          date: new Date(),
        };

        const token = jwt.sign(data, jwtSecretKey);
        // save user token

        res.json({ success: true, token: token });
      } else {
        res.render("login", {
          successMessage: false,
          errorMessage: "Username and password did not match!",
        });
      }

      // Else - if password incorrect - return error
    })
    .catch((err) => console.log(err));
};

//Check if user is logged in
exports.protected = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.render("login", {
      errorMessage: "Login required. Please login",
      successMessage: false,
    });
  }
};
