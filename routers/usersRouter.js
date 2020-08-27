
const express = require('express')
const usersRouter = express.Router()
const db = require('../dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


usersRouter.get('/',async (req,res)=> {
  const users = await db('users')
  res.status(200).json({users})
})

usersRouter.get('/:id',async (req,res)=> {
    const id = req.params.id
  const user = await db('users').where({id})
    res.status(200).json({user})
})

usersRouter.post('/register',(req,res)=> {
  req.body.password = bcrypt.hashSync(req.body.password,12)
  return db('users').insert(req.body)
        .then(user => {
            console.log(user)
            if(user){
                const token = generateToken(user)
                res.status(201).json({message:`user created, welcome ${req.body.username}!`,token})
            } else {
                res.status(400).json({message:'user not created'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message:'username not available! '})
        })

})

usersRouter.post('/login', (req,res)=> {
    const username = req.body.username
    return db('users').where({username})
        .then(user => {
            if(user && bcrypt.compareSync(req.body.password,user[0].password)){
                token = generateToken(user)
                res.status(200).json({message:`welcome back ${username}!`,token})
            } else {
                res.status(400).json({message:'invalid credentials'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message:'no user with that username'})
        })
})



// usersRouter.put(path,(req,res)=> {
  
// })

// usersRouter.delete(path,(req,res)=> {
  
// })

const generateToken = (user) => {
  const payload = {
      subject: user.id,
      username: user.username
    }

  const secret = 'string'
  const options = {
      expiresIn: '8h'
  }
  return jwt.sign(payload,secret,options)
}

module.exports = usersRouter





