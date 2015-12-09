var formidable = require('formidable');
var nodemailer = require('nodemailer');
var express = require('express');
var config = require('./config.json')
var app = express();

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var transporter = nodemailer.createTransport({
  service: config.emailservice,
  auth: {
    user: config.useremail,
    pass: config.password
  }
});

app.post('/contact', function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    var results = 'You just got a message through the contact form on your website.<br>Here\'s what it included:<br>';
    for (var prop in fields) {
      results+= '<strong>'+prop+'</strong> '+fields[prop]+'<br>';
    }
    results+= 'Thank you, feel free to reach out to them!<br>Cordially,<br>Your website';
    console.log(results);
    
    var mailOptions= {
      from: 'Whall Consulting Contact Form <'+config.useremail+'>',
      to: config.useremail,
      subject: 'New Contact Message',
      html: results
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        return console.log('ERROR: ' + error);
      }
	  
      console.log('SUCCESS: ' + info.response);
    });

  });
});

app.listen(8080);
console.log('Server running on port 8080');
