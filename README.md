# Express server with Passport and Twitter OAuth

A boilerplate for apps that use OAuth for authentication. This one uses Twitter, but it can be easily replaced or augmented with Facebook, Google or [many others](https://www.passportjs.org).


## Install

```shell
git clone https://github.com/dev-academy-challenges/boilerplace-oauth.git
cd boilerplace-oauth
npm install
```

A `postinstall` script will run a knex migration that creates a `users` table.


## Setup

* Go to https://dev.twitter.com and create a new app

```shell
mv .env.example .env
```

* Edit `.env` to include your Twitter app's keys


## Start/debug

```shell
npm start
# or npm run debug
```

* Using your browser, go to [http://localhost:3000](http://localhost:3000) and select the _Sign in_ link.


## Next

Build out the rest of your app :wink:
