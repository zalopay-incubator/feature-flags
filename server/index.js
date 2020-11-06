'use strict'

const fs = require('fs')
const unleash = require('unleash-server')
const passport = require('@passport-next/passport')
const GoogleOAuth2Strategy = require('@passport-next/passport-google-oauth2')
  .Strategy

const { User, AuthenticationRequired } = unleash

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

passport.use(
  new GoogleOAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      done(
        null,
        new User({
          name: profile.displayName,
          email: profile.emails[0].value
        })
      )
    }
  )
)

function enableGoogleOauth(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))
  app.get(
    '/api/admin/login',
    passport.authenticate('google', { scope: ['email'] })
  )

  app.get(
    '/api/auth/callback',
    passport.authenticate('google', {
      failureRedirect: '/api/admin/error-login'
    }),
    (req, res) => {
      // Successful authentication, redirect to your app.
      res.redirect('/')
    }
  )

  app.use('/api/admin/', (req, res, next) => {
    const whitelistRegex = new RegExp(
      '@' + escapeRegExp(process.env.WHITELISTED_DOMAIN) + '$'
    )

    if (req.user) {
      if (whitelistRegex.test(req.user.email)) {
        next()
      } else {
        return res
          .status('401')
          .json(
            new AuthenticationRequired({
              path: '/api/admin/login',
              type: 'custom',
              message: 'You don\'t have permission to access this dashboard.'
            })
          )
          .end()
      }
    } else {
      // Instruct unleash-frontend to pop-up auth dialog
      return res
        .status('401')
        .json(
          new AuthenticationRequired({
            path: '/api/admin/login',
            type: 'custom',
            message: `You have to identify yourself in order to use Unleash. 
            Click the button and follow the instructions.`
          })
        )
        .end()
    }
  })
}

const options = {
  adminAuthentication: null,
  preRouterHook: enableGoogleOauth,
  port: process.env.PORT || 4242,
}

if (process.env.DATABASE_URL_FILE) {
  options.databaseUrl = fs.readFileSync(process.env.DATABASE_URL_FILE, 'utf8')
}

unleash.start(options)

