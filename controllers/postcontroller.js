const mongoose = require('mongoose');
const Post = require('../models/postModel')
const User = require('../models/userModel')
const dotenv = require('dotenv');
const appError = require('../service/appError');


const postcontroller = {
async getPosts(req, res, next){
    const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
        const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
        const posts = await Post.find(q).populate({
            path: 'user',
            select: 'name photo '
        }).sort(timeSort);
          res.status(200).json({
          "status":"success",
          "data":posts
      })
   },
async createPosts(req, res, next){
    const body = req.body
    if(req.body.content == undefined){
        return next(appError(400,"你沒有傳入content資料",next))
    }
    const posts = await Post.create(body)
    res.status(200).json({
        "status":"success",
       "data":posts
    })
}  
}

module.exports = postcontroller;