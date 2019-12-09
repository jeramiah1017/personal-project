require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env
const ctrl = require('./controllers/controller')
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
app.post('/auth/register', auth.register)
app.post('/auth/login', auth.login)
app.delete('/auth/logout', auth.logout)
app.post('/api/faves', ctrl.addFave)
app.get('/api/faves', ctrl.getFaves)
app.delete('/api/deletefaves/:favorites_id', ctrl.deleteF)
app.put('/api/bio/:user_id', ctrl.updateBio)
// app.get('/api/encrypt', ctrl.getEncrypt)

app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} CS in 10 minutes`))
