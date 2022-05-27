var express = require('express');
var router = express.Router();
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
const {generateSendJWT,isAuth} = require('../service/auth');
const usercontroller = require('../controllers/usercontroller')



/* GET users listing. */
//註冊
router.post('/sign_up', handleErrorAsync(usercontroller.sign_up));
//登入
router.post('/sign_in', handleErrorAsync(usercontroller.sign_in));
//取得個人資料
router.get('/profile',isAuth, handleErrorAsync(usercontroller.getUserinfo))
//更新個人資料
router.patch('/profile',isAuth, handleErrorAsync(usercontroller.updateUserinfo))
//重設密碼
router.post('/updatePassword',isAuth,handleErrorAsync(usercontroller.updatePassword))

module.exports = router;
