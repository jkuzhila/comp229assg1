let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create reference to model
let Book = require('../models/book');

module.exports.displayBookList = (req,res,next) =>(
    Book.find((err,BookList)=>(
    if (err)
    {
        return console.error(err);

    }
    else
    {
          //console.log(BookList);

          res.render('book/list', {title: 'Books',BookList:bookList, displayName: req.user?req.user.displayName:''});

    }
    ));

)
module.exports.displayAddPage =(req,res,next)=>{
    res.render('book/add', {title: 'add book',displayName: req.user?req.user.displayName:''})

}
module.exports.processAddPage =(req,res,next)=>{
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price

    });

    Book.create(newBook,(err,Book)=>{
         if (err)
         {
            console.log(err);
            res.end(err);

         }
         else
          {
              // refresh book list
              res.redirect('/book.list');
         }
    }
    module.exports.displayEditPage =(req,res,next)=>{
        let id = req.params.id;
        Book.findById(id,(err,booktoEdit)=>{
            if (err)
            {
               console.log(err);
               res.end(err);
        
            }
            else
            {
                // show edit view
                res.render('book/edit',{title: 'Edit book', book:booktoEdit, displayName: req.user?req.user.displayName:''} )
           }
        
        });
        }
        module.exports.processEditPage =(req,res,next)=>{
            let id = req.params.id;
            let updatedBook = Book({
                "id": id,
                "name": req.body.name,
                "author": req.body.author,
                "published": req.body.published,
                "description": req.body.description,
                "price": req.body.price
        
            });
              Book.updateOne({id: id},updatedBook,(err)=>{
                if (err)
                {
                   console.log(err);
                   res.end(err);
            
                }
                else
                {
                    // refresh book list
                    res.redirect('/book.list');
               }
        
        
              }
              module.exports.performDelete =(req,res,next)=>{
                let id = req.params.id;
                Book.remove({id: id},(err)=>{
                    if (err)
                    {
                       console.log(err);
                       res.end(err);
                
                    }
                    else
                    {
                        // refresh book list
                        res.redirect('/book.list');
                   }
            
                });
            }