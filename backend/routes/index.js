const express = require('express')
const router = express.Router()
const {search,signin,api,isAuth} = require('../controller/index')
const {auth} = require('../middlewares/auth')

router.get('/usa', search)
// router.get('/test', search)
// router.post('/index',(req, res) => {
//     const data = req.body
//     res.send(data)
// })
router.post('/signin',signin)
router.post('/user/login',signin)
router.get('/isAuth', isAuth)


module.exports = router
