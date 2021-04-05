const express = require('express')
const {search,signin,api,isAuth} = require('../controller/index')
const {signup,getInfo,deleteUser} = require('../controller/user')
const router = express.Router()

router.get('/usa', search)
router.get('/test', search)
// router.post('/index',(req, res) => {
//     const data = req.body
//     res.send(data)
// })
router.get('/signin',signin)
router.post('/user/login',api)
router.get('/isAuth', isAuth)
router.get('/users',getInfo)
router.delete('/users',deleteUser)
router.post('/signup',signup)


module.exports = router
