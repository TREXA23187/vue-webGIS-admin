const express = require('express');
const router = express.Router();

const {signup,getInfo,deleteUser} = require('../controller/user')
const {auth} = require('../middlewares/auth')


router.post('/signup',signup)
router.get('/info',auth,getInfo)
router.delete('/user',auth,deleteUser)


module.exports = router;
