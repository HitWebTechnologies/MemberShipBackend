const router = require('express').Router()
const controllers = require('./controllers')

router.post('/register', controllers.registerMember)
router.post('/register-login/:id', controllers.registerMemberLogin)
router.post('/login', controllers.login)
router.get('/members', controllers.getAllMembers)



module.exports = router