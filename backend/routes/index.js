const express = require('express')
const {list, search,signin,api,isAuth} = require('../controller/index')

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
module.exports = router
