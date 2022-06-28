const path = require('path')
const Vonage = require('@vonage/server-sdk')

require('dotenv').config({ path: path.join(__dirname, '.env') })

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  applicationId: process.env.VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_PRIVATE_KEY
})

module.exports = vonage
