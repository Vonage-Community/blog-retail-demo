const express = require('express')
const router = express.Router()

require('dotenv').config({ path: path.join(__dirname, '.env') })

router.get('/', (request, response) => {
  if (!request.session.verified) {
    return response.redirect('/verify/')
  }

  return response.render('voice/index', {
    user: request.session.user,
    from_number: process.env.FROM_NUMBER
  })
})

module.exports = router
