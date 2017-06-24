/**
 * Created by xiaohe on 2017/6/24.
 */

var express = require('express');
var router = express.Router();
var User = require('../models/user')

//登录
router.post('/login',function(req,res){

    var telephone = req.body.telephone;
    var password = req.body.password;
    console.log(telephone);
    console.log(password);
    console.log(req.body);
    // fetch user and test password verification
    User.findOne({ telephone: telephone }, function(err, user) {
        if (err) {
            res.json({status:'error','errcode':2});return;
        }
        if(!user){
            res.json({status:'error','errcode':1});
            return;
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err){
                res.json({status:'error','errcode':2});return;
            }
            if(isMatch){
                const crypto = require('crypto');
                token = crypto.randomBytes(64).toString('hex');
                user.token = token;
                user.save(function(err){
                    if (err)  res.json({status:'error','errcode':0});
                    else res.json({status:'success','user':{'userID':user.id,"token":user.token,"avatar":user.avatar,"nickname":user.nickname,"description":user.description,"type":user.type,"subject":user.subject,"level":user.level,"item":user.item,"province":user.province,"sex":user.sex}});
                })
            }else{
                res.json({status:'error','errcode':2});
            }
        });

    });
});

module.exports = router;