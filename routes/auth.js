const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/register',async (req,res)=>{
  const {username,password,name} = req.body
  if(!name || !username || !password){
    return res.render('register',{message:"Please try again"})
  }
  const dup = await User.findOne({
    username
  })
  if(dup){
    return res.render('register',{message:'This username already exist!'})
  }
  const passwordHash = bcrypt.hashSync(password,10)
  const user = new User({
    name,
    username,
    password: passwordHash
  })

  await user.save()
  res.render('index',{user})
})
router.post('/login', async (req,res)=>{
  const {username,password} = req.body
  if(!username || !password){
    return res.render('register',{message:"Please try again"})
  }
  const user = await User.findOne({
    username
  })
  if(user){
    const isCorrect = bcrypt.compareSync(password,user.password)
    if(isCorrect){
      return res.render('index',{user})
    }
    else{
      return res.render('login', {message: 'Username or Password Incorrect!'})
    }
  }
  else {
    return res.render('login', res.render('login',{message: 'Username does not exist'}))
  }
})

module.exports = router;
