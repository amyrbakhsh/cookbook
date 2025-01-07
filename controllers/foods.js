// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', (req, res) => {
    res.render('foods/index.ejs');
  }
);

router.get('/new', (req, res) => { 
    res.render('foods/new.ejs'); 
});
  
router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.pantry.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  }
);

module.exports = router;
