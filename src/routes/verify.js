const path = require('path')
const express = require('express')
const router = express.Router()
const vonage = require('../vonage')
const { getUser } = require('../conversation')

require('dotenv').config({ path: path.join(__dirname, '.env') })

router.get('/', (request, response) => {
  response.render('verify/start', {
    item_name: request.query.item_name
  })
})

router.post('/', (request, response) => {
  vonage.verify.request({
    number: request.body.mobile_number,
    brand: 'Vonage Store Demo',
    workflow_id: 6
  }, (err, results) => {
    if (err) {
      console.error(err)
    }

    request.session.verify_request_id = results.request_id
    request.session.mobile_number = request.body.mobile_number
    request.session.save()

    response.redirect('/verify/check')
  })
})

router.get('/check', (request, response) => {
  if (!request.session.verify_request_id) {
    return response.redirect('/verify/')
  }

  response.render('verify/check', {
    item_name: request.query.item_name
  })
})

router.post('/check', async (request, response) => {
  vonage.verify.check({
    request_id: request.session.verify_request_id,
    code: request.body.verify_pin
  }, async (err, results) => {
    if (err) {
      delete request.session.verify_request_id
      request.session.save()
    } else {
      request.session.verified = true
      request.session.save()
      request.session.user = await getUser(request.session.mobile_number)

      response.redirect('/voice')
    }
  })
})

module.exports = router
