var express=require('express')
var router= express.Router()
const bcryptjs = require('bcryptjs')

const rooms = []

  
  router.post('/privroom', async (req, res) => {
    console.log(req.body)
    if(!req.body.room||!req.body.pass)
    res.status(403).send('Incomplete Credentials')
    else{
      const room = rooms.find(room => room.name === req.body.room)

    if(room)
    res.status(400).send('Room already exists with same name')

    else{
      try {
        const hashedPassword = await bcryptjs.hash(req.body.pass, 10)
        const room = { name: req.body.room, password: hashedPassword }
        rooms.push(room)
        res.status(200).send()
      } catch {
        res.status(500).send()
      }
    }
    }
    
    
  })
  
  router.post('/auth', async (req, res) => {
    const room = rooms.find(room => room.name === req.body.name)
    if (room == null) {
      res.status(400).send()
    }
    try {
      if(await bcryptjs.compare(req.body.pass, room.password)) {
        res.status(200).send()
      } else {
        res.status(403).send()
      } 
    } catch {
      res.status(500).send()
    }
  })



module.exports = router;