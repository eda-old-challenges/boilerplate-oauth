const users = require('./users')

const twitterConfig = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: 'http://localhost:3000/auth/twitter/callback'
}

function verify (token, tokenSecret, profile, done) {
  const user = { username: profile.username }
  users.getByTwitter(profile.id)
    .then(userList => {
      if (userList.length === 0) {
        users
          .create(profile.username, profile.id)
          .then(newIds => {
            user.id = newIds[0]
            done(null, user)
          })
          .catch(err => done(err, false, { message: "Couldn't add user due to a server error." }))
      } else {
        user.id = userList[0].id
        done(null, user)
      }
    })
    .catch(err => {
      done(err, false, { message: "Couldn't check your credentials with the database." })
    })
}

module.exports = {
  twitterConfig: twitterConfig,
  verify: verify
}
