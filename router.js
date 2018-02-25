const express = require('express')
const multer  = require('multer')
const register = require('./controllers/register')
const login = require('./controllers/login')
const auth = require('./controllers/auth')
const forgotPassword = require('./controllers/forgot')
const newShipment = require('./controllers/newshipment')
const Router = express.Router()
const upload = multer({ dest: 'uploads/' })

Router

// UNPROTECTED ROUTES
// register & login
.post('register/company',register.company)
.post('register/user',register.user)
.post('login',login)
// reset password
.post('forgot/send', forgotPassword.sendToken)
.post('forgot/update', forgotPassword.update)

// Auth middleware
.use(auth)
// ROUTES PROTECTED BY AUTH
.post('company/newshipment', upload.single('file'), newShipment)
console.log('coucou')
module.exports = Router
