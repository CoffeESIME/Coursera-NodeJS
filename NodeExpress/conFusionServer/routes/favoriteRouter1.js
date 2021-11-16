const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Favorites = require('../models/favorite');
const Dishes = require('../models/dishes');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ "user": req.user._id })
    .populate('user')
    .populate('dishes')
    .then((favorite) => {
        if (favorite != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }
        else {
            err = new Error('Favorites of ' + req.user._id + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => {next(err)});
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported on /favorites");
})
.post(authenticate.verifyUser, (req, res, next) => {
    for (var i=0; i<req.body.length; i++) {
        Dishes.findById(req.body[i])
        .then((dish) => {
            if (dish == null) {
                err = new Error("Dish Id" + req.body[i]._id + " not found");
                err.statusCode = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => {next(err)});
    }
    Favorites.findOne({ "user": req.user._id })
    .then((favorite) => {
        if (favorite == null) {
            Favorites.create({"user": req.user._id, "dishes": []})
            .then((favorite) => {
                for (var i = 0; i < req.body.length; i++) {
                    if (favorite.dishes.includes(req.body[i]._id)) {
                        var index = favorite.dishes.indexOf(req.body[i]._id);
                        favorite.dishes.splice(index, 1);
                    }
                }
                favorite.dishes.push(...req.body);
                favorite.save()
                .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }, (err) => next(err))
                .catch((err) => {next(err)});
            })
        }
        else {
            for (var i = 0; i < req.body.length; i++) {
                if (favorite.dishes.includes(req.body[i]._id)) {
                    var index = favorite.dishes.indexOf(req.body[i]._id);
                    favorite.dishes.splice(index, 1);
                }
            }
            favorite.dishes.push(...req.body);
            favorite.save()
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))
            .catch((err) => {next(err)});
        }
    }, (err) => next(err))
    .catch((err) => {next(err)});
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({"user": req.user._id})
    .then((favorite) => {
        if (favorite != null) {
            Favorites.findByIdAndRemove(favorite._id)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
        }
        else {
            err = new Error("Favorites of " + req.user._id + " not found");
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => {next(err)});
});

favoriteRouter.route('/:dishId')
.get(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation is not supported on /favorites/" + req.params.dishId);
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported on /favorites" + req.params.dishId);
})
.post(authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish == null) {
        err = new Error("Dish Id" + req.params.dishId + " not found");
        err.statusCode = 404;
        return next(err);
        }
    }, (err) => next(err))
    .catch((err) => {next(err)});
    Favorites.findOne({ "user": req.user._id })
    .then((favorite) => {
        console.log(req.user._id);
        if (favorite == null) {
            Favorites.create({"user": req.user._id, "dishes": []})
            .then((favorite) => {
                favorite.dishes.push(req.params.dishId);
                favorite.save()
                .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }, (err) => next(err))
                .catch((err) => {next(err)});
            }, (err) => next(err))
            .catch((err) => {next(err)});
        }
        else {
            if (favorite.dishes.includes(req.params.dishId) == false) {
                favorite.dishes.push(req.params.dishId);
            }
            favorite.save()
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))
            .catch((err) => {next(err)});
        }
    }, (err) => next(err))
    .catch((err) => {next(err)});
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({"user": req.user._id})
    .then((favorite) => {
        var isRemoved = false;
        if (favorite != null) {
            for (var i = 0; i < favorite.dishes.length; i++) {
                if (favorite.dishes[i] == req.params.dishId) {
                    isRemoved = true;
                    favorite.dishes.splice(i, 1);
                }
            }
            if (isRemoved == false) {
                err = new Error("Dish Id " + req.params.dishId + " not found");
                err.statusCode = 404;
                return next(err);
            }
            else {
                favorite.save()
                .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }, (err) => next(err))
                .catch((err) => {next(err)});
            }
        }
        else {
            err = new Error("Favorites of " + req.user._id + " not found");
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => {next(err)});
});

module.exports = favoriteRouter;