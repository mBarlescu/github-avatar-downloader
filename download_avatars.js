var request = require('request');
var secret = require('./secrets.js').GITHUB_TOKEN;

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret,
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}



function callback(err, result) {

  if(err) {
      console.log("Errors:", err);
  }

  var obj = JSON.parse(result);
  obj.forEach(function (i){
    console.log(i.avatar_url);
  })
  // console.log("Result:", obj[0]);
}

getRepoContributors("jquery", "jquery", callback);
