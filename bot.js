var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;


var keithRegex = /^72906068$/;
var kirschRegex = /^66156551$/;
var timRegex = /^39924012$/;
var daveRegex = /^71907387$/;
var leifRegex = /^74942548$/;
var simonRegex = /^39611527$/;

function getName(user_id) {
    if(leifRegex.test(user_id)) return "Leif"
}

function respond() {
  var request = JSON.parse(this.req.chunks[0]);

  if (request.user_id && (keithRegex.test(request.user_id) || kirschRegex.test(request.user_id) || leifRegex.test(request.user_id)
                          || timRegex.test(request.user_id) || daveRegex.test(request.user_id) || simonRegex.test(request.user_id))) {
    this.res.writeHead(200);
    postMessage(getName(request.user_id));
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(user_name) {
  var botResponse, options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : "Fuck " + user_name + " and fuck EC"
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;