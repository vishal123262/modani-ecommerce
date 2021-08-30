const User = require("../models/user");
const { check, validationResult } = require('express-validator');
const { errors } = require("formidable");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { sendWelcomeEmail } = require("../emails/account");

exports.signup = (req , res) => {

   const errors = validationResult(req)
   
   if(!errors.isEmpty())
   {
       return res.status(422).json({
           error :errors.array()[0].msg
       })
   }

   const user = new User(req.body);
   user.save((err, user) => {
       if(err)
       {
           return res.status(400).json({
               err :"Not able to save user in DB!"
           });
       }
       //console.log(user.email)
       return res.json({
           name : user.name,
           email :user.email,
           id : user._id
       })
   });
   sendWelcomeEmail(user.email , user.name)
};

exports.signin = (req , res) => {
    const {email, password} = req.body;
    const errors = validationResult(req)
   
     if(!errors.isEmpty())
     {
        return res.status(422).json({
           error :errors.array()[0].msg
        })
      }

    User.findOne({email}, (err , user) => {
      if(err || !user)
      {
        return res.status(400).json({
              error: "user email doesn't exist!"
          })
      }
      if(!user.authenticate(password)){
        return res.status(401).json({
            error: "email and password do not match!"
        })
      }
      
      // create token
      const token = jwt.sign({_id: user.id}, process.env.SECRET)

      // put token in coockie
      res.cookie("token" , token, {expire: new Date() + 9999})

      // send respone to frontend
      const {_id , name , email, role} = user
      res.json({token, user: {_id , name, email , role}})
    })
}

exports.signout = (req , res) => {
    res.clearCookie("token");
    res.json({
        "message" : "User signout successfully!"
    });
};

// protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

// coustom middlewares
exports.isAuthenticated = (req , res , next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "access denied!"
        })
    }
    next()
}

exports.isAdmin = (req , res , next) => {
    if(req.profile.role === 0){
        res.status(403).json({
            error: "you are not admin!"
        })
    }
    next()
}
