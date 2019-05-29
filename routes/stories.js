const express = require('express');
const mongoose = require('mongoose');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('stories/index');
});

router.get('/edit', ensureAuthenticated, (req, res) => {
    res.render('stories/edit');
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});





module.exports = router;