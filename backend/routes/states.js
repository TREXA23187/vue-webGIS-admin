const express = require('express')
const router = express.Router()

const {add,getInfo} = require('../controller/states')

router.post('/add',add)
router.get('/info',getInfo)

module.exports = router
