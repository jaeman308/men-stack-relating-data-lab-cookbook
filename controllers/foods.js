const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);   
      res.render('foods/index.ejs', {
        foods: currentUser.pantry,
      })
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  });


  router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
  });

  router.post('/', async (req,res) => {
    try{
      const currentUser = await User.findById(req.session.user._id);
      const newPantryItem = {
        name: req.body.name,
      };
      currentUser.pantry.push(newPantryItem);
      console.log('Updated Pantry', currentUser.pantry);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods/`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  router.delete('/:foodsId', async (req, res)=> {
    try{
      const currentUser = await User.findById(req.session.user._id);
      const foodItem = currentUser.pantry.id(req.params.foodsId);
      foodItem.deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
    

module.exports = router;
