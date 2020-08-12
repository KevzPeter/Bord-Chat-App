var express=require('express')
var router= express.Router()
const bcryptjs = require('bcryptjs')

const accounts = []
  
  router.post('/signup', async (req, res) => {
      if(!req.body.name||!req.body.email||!req.body.password)
      res.status(403).send('Incomplete Credentials')
      else{
        const user = accounts.find(account => account.email === req.body.email)
      if(user)
      {
        res.status(400).send('User already exists!')
      }
      else{
        try {
          const hashedPassword = await bcryptjs.hash(req.body.password, 10)
          const user = { name: req.body.name, email:req.body.email, password: hashedPassword }
          accounts.push(user)
          console.log(user.name)
          res.status(200).send(user.name)
        } catch {
          res.status(500).send()
        }
      }
      }
      
  })
  
  router.post('/login', async (req, res) => {
    const user = accounts.find(account => account.email === req.body.email)
    if (user == null) {
      res.status(400).send('Cannot find user')
    }
    try {
      if(await bcryptjs.compare(req.body.password, user.password)) {
        res.status(200).send(user.name)
      } else {
        res.status(403).send('Not Allowed')
      } 
    } catch {
      res.status(500).send()
    }
  })



module.exports = router;