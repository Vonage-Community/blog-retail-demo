const path = require('path')
const express = require('express')
const router = express.Router()

require('dotenv').config({ path: path.join(__dirname, '.env') })

router.get('/index', (request, response) => {
  return response.render('voice/index', {
    user: request.session.user
  })
})

router.get('/answer', (request, response) => {
  console.log('Answering call')
  response.json([
    {
      action: 'talk',
      text: 'Thank you for calling the store. Transferring you to an agent'
    },
    {
      action: 'connect',
      from: process.env.FROM_NUMBER,
      eventUrl: [process.env.DOMAIN + '/webhooks/events'],
      endpoint: [{
        type: 'phone',
        number: process.env.TO_NUMBER
      }]
    }
  ])
})

router.get('/events', (request, response) => {
  console.log('Event')
  console.log(request.body)
  response.status(204).send()
})

module.exports = router
