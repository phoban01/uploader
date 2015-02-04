/*Define dependencies.*/

var express=require("express");
var path=require("path");
var multer  = require('multer');
var pdf2swf = require('pdf2swf');
var fs = require('fs');
require('shelljs/global');
var app=express();
var done=false;

var output_dir = './uploads/';

var routes = require('./routes/index');

/*Configure the multer.*/
app.use(multer({ 
  dest: output_dir,
  rename: function (fieldname, filename) {
    return filename+Date.now();
  },
  onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    var clean_name = output_dir.concat(file.originalname);
    fs.rename(file.path,clean_name,function (err) {});
    pdf2swf.convert(clean_name,clean_name.replace('pdf','swf'),null,function (err) {});
    exec('pdf2json '.concat(clean_name + ' ' + clean_name.replace('pdf','json')))
    done=true;
}
}));

app.use('/',routes);

app.set('port',(process.env.PORT || 8080));
app.use(express.static(path.join(__dirname, 'public')));

/*Run the server.*/
app.listen(app.get('port'), function() {
    console.log('Node Simple Server is Running at localhost:' + app.get('port'))
});

module.exports = app;