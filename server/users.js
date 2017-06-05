const development = require('../knexfile').development
const knex = require('knex')(development)

module.exports = {
  create: create,
  deserialize: deserialize,
  exists: exists,
  getById: getById,
  getByTwitter: getByTwitter,
  serialize: serialize
}

function create (username, twitterId) {
  return knex('users')
    .insert({
      username: username,
      twitter_id: twitterId
    })
}

function exists (twitterId) {
  return knex('users')
    .count('id as n')
    .where('twitter_id', twitterId)
    .then(count => {
      return count[0].n > 0
    })
}

function getById (id) {
  return knex('users')
    .select('id', 'username')
    .where('id', id)
}

function getByTwitter (twitterId) {
  return knex('users')
    .select()
    .where('twitter_id', twitterId)
}

function deserialize (id, done) {
  getById(id)
    .then(users => {
      if (users.length === 0) {
        return done(null, false)
      }
      done(null, users[0])
    })
    .catch(err => {
      done(err, false)
    })
}

function serialize (user, done) {
  done(null, user.id)
}
