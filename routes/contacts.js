var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Contact = require('../models/contact');
var User = require('../models/user');

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Authentication failed',
                error: err
            });
        }
        next();
    });
});

// Add Contact
router.post('/', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, doc) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phoneno: req.body.phoneno,
            user: doc
        });
        contact.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            doc.contacts.push(result);
            doc.save();
            res.status(201).json({
                message: 'Saved Contact',
                obj: result
            });
        });
    });
});

//Get all tokens
router.get('/all', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    console.log(decoded);
    Contact.find({user: decoded.user._id}).exec(function(err, docs) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});

//Get contact by id
router.get('/:id', function(req,res,next) {
    Contact.findById(req.params.id, function(err, doc){
         if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
         }
         
         res.status(200).json({
                message: 'Success',
                obj: doc
         });

    });

});

router.patch('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Contact.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: err
            });
        }
        if (!doc) {
            return res.status(500).json({
                title: 'No contact found',
                message: 'Contact could not be found'
            });
        }
        if (doc.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authorized',
                message: 'Contact created by other user'
            });
        }


        doc.name = req.body.name;
        doc.email = req.body.email;
        doc.phoneno = req.body.phoneno;

        doc.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    message: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
    });
});

//Delete Contact
router.delete('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Contact.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!doc) {
            return res.status(500).json({
                title: 'No contact found',
                error: {message: 'Contact could not be found'}
            });
        }
        if (doc.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authorized',
                error: {message: 'Contact created by other user'}
            });
        }
        doc.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
    });
});

module.exports = router;

