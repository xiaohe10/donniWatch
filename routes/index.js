var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // req get some params
  res.render('index', { title: 'Express' });
});


router.post('/watchupload',function(req,res,next){
    console.log(req.body);
    //从req中获取上行编号:ap_no
    //根据上行编号分发处理函数

    //todo
    ap_router = {
        'AP00':login_fun(res),
        'AP01':login_fun(res)
    }
    res.send(ap_router[ap_no]);
})

function login_fun(req){
    return 'IWBP00,20150101125223,8,zh_CN, Asia/chongqing,1390001|1380002,1370001|1360002#';
}
module.exports = router;
