const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/register',async (req,res)=>{
  const {username,nationalID,password,confirmPassword} = req.body
  //regex is unfinished, regex (Regular Expression) is a type of tool used to validate strings.
  //Student ID regex
  const studentRegex = RegExp('//g')
  //National ID
  const nationalIDRegex = RegExp('//g')
  const dup = await User.findOne({
    username
  })
  //check if username is already taken
  if(dup){
    return res.render('register',{message:'This username already exist!'})
  }
  //Validate student id
  else if(studentRegex.test(username)){
    return res.render('register',{message:'Invalid student id!'})
  }
  //Validate national id
  else if(nationalIDRegex.test(nationalID)){
    return res.render('register',{message:'Invalid student id!'})
  }
  //Validate confirm password
  else if(password !== confirmPassword){
    return res.render('register',{message:"Password does not match!"})
  }
  //Securing password
  const passwordHash = bcrypt.hashSync(password,10)
  //Securing national ID
  const nationalIDHash = bcrypt.hashSync(nationalID,10)
  //Storing new registration
  const user = new User({
    username,
    password: passwordHash,
    nationalID:nationalIDHash,
    voted: false
  })

  await user.save()
  //redirect to home page
  res.render('index',{user})
})
router.post('/login', async (req,res)=>{
  const {username,password} = req.body
  //if the user did not type in username or password
  if(!username || !password){
    return res.render('register',{message:"Please try again"})
  }
  //find username
  const user = await User.findOne({
    username
  })
  //if the username is found
  if(user){
    //check if the password matches the corresponding username in the database
    const isCorrect = bcrypt.compareSync(password,user.password)
    //if correct, redirect the user to homepage
    if(isCorrect){
      return res.render('index',{user})
    }
    //else, error
    else{
      return res.render('login', {message: 'Username or Password Incorrect!'})
    }
  }
  //username not found
  else {
    return res.render('login', res.render('login',{message: 'Username does not exist'}))
  }
})

module.exports = router;
