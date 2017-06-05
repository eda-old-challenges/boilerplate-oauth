const express = require('express')
const passport = require('passport')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn

const router = express.Router()

router.get('/', (req, res) => {
  const viewData = {
    user: req.user || {},
    flash: req.flash('status')
  }
  viewData.user.isLoggedIn = !!req.user
  res.render('home', viewData)
})

router.get('/auth', (req, res) => {
  const viewData = {
    flash: req.flash('status')
  }
  res.render('signin', viewData)
})

router.get('/auth/twitter', passport.authenticate('twitter'))

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/auth',
    failureFlash: true
  }),
  (req, res) => { // authentication was successful
    req.flash('status', 'Logged in')
    res.redirect('/')
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('status', 'Logged out')
  res.redirect('/')
})

router.get('/profile', ensureLoggedIn('/auth'), (req, res) => {
  const user = req.user || {}
  user.isLoggedIn = !!req.user
  res.render('profile', {user})
})

module.exports = router
