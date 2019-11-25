require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env
// const ctrl = require('./controllers/controller')
const auth = require('./controllers/authController')
const app = express()

app.use(express.json())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET 
}))
massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('Database Connected')
})

app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} CS in 10 minutes`))
