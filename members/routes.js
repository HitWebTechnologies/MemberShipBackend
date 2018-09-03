const router = require('express').Router()
const controllers = require('./controllers')

router.post('/register', controllers.registerMember)
router.post('/register-login/:id', controllers.registerMemberLogin)

module.exports = router