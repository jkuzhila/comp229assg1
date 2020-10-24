let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


let bookController = require('../controller/book');
// helper functio for guard
function requirements(req,res,next){
    // check user logged in
    if (!user.isAutheticated())
    (
        return res.redirect('/login');

    )
    next();
}

// GET route for booklist page - read operation
router.get('/', bookController.displayBookList);

// Get route for display Add page Create operation
router.get('/add', requireAuth, bookController.displayAddPage);
//  Post route for processing Add page
router.post('/add',requireAuth, bookController.processAddPage);

// Get route for display Edit page update operation
router.get('/edit/:id',requireAuth, bookController.displayEditPage);
//  Post route for processing Edit page update operation
router.post('/edit/:id', requireAuth,bookController.processEditPage);

// Get for performing deletion Delete operation
router.get('/delete/:id',requireAuth, bookController.performDelete);
module.exports = router; 
