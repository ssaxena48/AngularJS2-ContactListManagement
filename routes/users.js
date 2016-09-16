var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
//var bcrypt = require('bcrypt');
var passwordHash = require('password-hash');

var User = require('../models/user');

// Login route
router.post('/signin', function (req, res, next) {
    User.findOne({email: req.body.email}, function (err, doc) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!doc) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'User could not be found'}
            });
        }
        if (!passwordHash.verify(req.body.password, doc.password)) {
            return res.status(401).json({
                title: 'Could not sign you in',
                error: {message: 'Invalid password'}
            });
        }
            
        var token = jwt.sign({user: doc}, 'secret', {expiresIn: 7200});
            res.status(200).json({
                message: 'Success',
                token: token,
                userId: doc._id,
                obj: doc
            });
        });
    })

//Create User
router.post('/', function (req, res, next) {
      var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: passwordHash.generate(req.body.password),
            email: req.body.email,
            type: req.body.type
        });
        user.save(function (err, result) {
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

//This route is to check if the user is authenticated and token is valid
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

//Change Password
router.post('/changePassword', function(req, res, next) {
 //Decode the token to get the user id. This is done so that only the user can change his/her own password 
 var decoded = jwt.decode(req.query.token);
 //Find the user
 User.findById(decoded.user._id, function(err,doc){
      if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
      }
      if (!doc) {
            return res.status(500).json({
                title: 'No User found',
                error: {message: 'User could not be found'}
            });
      }

      //If user found, check the old password
      if (!passwordHash.verify(req.body.oldPassword, doc.password)) {
          return res.status(500).json({
                title: 'Wrong Password',
                error: {message: 'Old Password not match'}
            });
      }

      doc.password = passwordHash.generate(req.body.newPassword);
      doc.save(function(err, result) {
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

//Update User
router.patch('/:id', function(req, res, next) {
    console.log(req.params.id);
    User.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: err
            });
        }
        if (!doc) {
            return res.status(500).json({
                title: 'No User found',
                message: 'User could not be found'
            });
        }
        
        for(var key in req.body){
            if (req.body.hasOwnProperty(key)) {
                doc[key] = req.body[key];
            }
        }

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


router.post('/search', function (req, res, next) {
        console.log("In User route");
        var conditions = {};

        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                conditions[key] = new RegExp('^' + req.body[key] , "i");
                //conditions[key] = new RegExp(req.body[key] ,'i');
            }
        }
        var query = User.find(conditions);
        console.log("query " + query);

        query.exec(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            else {
                console.log("Docs" + result);
                res.status(200).json({
                    message: 'Success',
                    obj: result
                });
            }
        });
    });

router.get('/:id', function(req, res, next) {
    console.log(req.params.id);
    User.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!doc) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'User could not be found'}
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: doc
        });
    });
});

router.delete('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!doc) {
            return res.status(500).json({
                title: 'No user found',
                error: {message: 'User could not be found'}
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