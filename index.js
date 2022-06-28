const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const app = require('express')()
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const jwt = require('./src/routes/jwt')
const verify = require('./src/routes/verify')
const voice = require('./src/routes/voice')
const webhooks = require('./src/routes/webhooks')

app.use(session({
  secret: 'store-demo',
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: true,
  saveUninitialized: true,
  sameSite: 'none'
}))
app.use(cookieParser())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views/'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', jwt)
app.use('/verify', verify)
app.use('/voice', voice)
app.use('/webhooks', webhooks)

app.route('/').get((request, response) => {
  response.redirect('/verify');
})

app.listen(process.env.PORT || 3000)
