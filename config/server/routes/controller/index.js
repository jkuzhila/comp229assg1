let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
// create user model instance
let userModel = require('../models/user');
let User = userModel.User; // alias




module.exports.displayHomePage= (req, res, next) => {
    res.render('index', { title: 'Home', displayName : req.User? req.User.displayName:''});
}

module.exports.displayAboutPage= (req, res, next) => {
    res.render('about', { title: 'About', displayName : req.User? req.User.displayName:''});
}
module.exports.displayProjectsPage= (req, res, next) => {
    res.render('about', { title: 'Projects', displayName : req.User? req.User.displayName:''});
}
module.exports.displayServicesPage= (req, res, next) => {
    res.render('about', { title: 'Services', displayName : req.User? req.User.displayName:''});

}
module.exports.displayContactPage= (req, res, next) => {
    res.render('about', { title: 'Contact', displayName : req.User? req.User.displayName:''});
}

module.exports.displayLoginPage = (req, res, next)=> {
   //if user alteady logged in
   if (!req.User)
    {
        res.render('auth/login',
        messages: req.flash('loginMessage',
        displayName: req:User ? req:User.displayName:""
         ))


   }
   else 
   {
       return res.redirect('/');


   }
}
module.exports.processLoginPage =(req,res,next)=>{
    passport.authenticate('local',
    (err,User,info)=>{
        //server error
        if(err) {
            return next(err);

        }
        // is ther user login error
        if (!User){
            req.flash('loginMessage', 'Authentication err');
            return res.redirect('/login');
        }
        req.login(User,(err)=>{
            //server err?
            if(err) {
                return next(err);
    
            }
            return res.redirect('/book-list');

        })
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>{
    // if user not logged in
    if (!req.User)
    {
        res.render('auth/register',
        title: 'Register',
        messages:req.flash('registerMessage'),
        displayName:req.User?req.User.displayName:'');
    }
    else
    {
        return res.redirect('/');
    }
}
module.exports.processRegisterPage = (req, res, next) =>{
    // instantiate user object
    let newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        displayName: req.body.displayName,

    });
    User.register(newUser,req.body.password,(err)=>{
        if(err)
        {
            console.log("Error: inserting new user");
            if(err.name=="Userexistserror")
            {
                req.flash(
                    'register messge',
                    'refister error: user exists'
                );
                console.log("Error: user exists");
            }
            return res.render('auth/register',
            title: 'Register',
            messages:req.flash('registerMessage'),
            displayName:req.User?req.User.displayName:'');
            
        }
        else{
            // if no error exists register success
            // redirect and authenticate
            return passport.authenticate('local')(req,res ()=>{
                 res.redirect('/book-list')
            });
        }
    });
}
module.exports.performLogout = (req, res, next) =>{
    req.logOut();
    res.redirect('/');
}