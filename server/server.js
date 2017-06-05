const path = require('path')
const express = require('express')
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const TwitterStrategy = require('passport-twitter').Strategy
const expressSession = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

const auth = require('./auth')
const users = require('./users')
const routes = require('./routes')

const server = express()

process.on('unhandledRejection', (error, promise) => {
  console.error('UNHANDLED REJECTION', error.stack)
})

server.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}))
server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'views'))

const session = expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
})

server.use(session)
server.use(cookieParser())
server.use(passport.initialize())
server.use(passport.session())
server.use(flash())

server.use(express.static(path.join(__dirname, 'public')))
server.use('/', routes)

passport.use(new TwitterStrategy(auth.twitterConfig, auth.verify))
passport.serializeUser(users.serialize)
passport.deserializeUser(users.deserialize)

module.exports = server
