const express = require('express')
const router = express.Router()
const vonage = require('../vonage')

router.get('/jwt', (request, response) => {
  const jwt = vonage.generateJwt({
    sub: request.session.user.name,
    acl: {
      paths: {
        '/*/users/**': {},
        '/*/conversations/**': {},
        '/*/sessions/**': {},
        '/*/devices/**': {},
        '/*/image/**': {},
        '/*/media/**': {},
        '/*/applications/**': {},
        '/*/push/**': {},
        '/*/knocking/**': {},
        '/*/legs/**': {}
      }
    }
  })

  response.json({ jwt })
})

module.exports = router
