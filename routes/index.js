var express = require('express');
var router = express.Router();


/*Handling routes.*/
router.get('/',function(req,res){
      res.sendfile("./views/index.html");
});

router.post('/upload/complete',function(req,res){
    // console.log(req.files);
    res.sendfile("./views/complete.html");
});

module.exports = router;
