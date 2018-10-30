var request = require('request');
var secret = require('./secrets.js').GITHUB_TOKEN;
var fs = require('fs');

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
var contributors = [];
  if(err) {
      console.log("Errors:", err);
  }

  var obj = JSON.parse(result);
  obj.forEach(function (i){
    console.log(i.avatar_url);
    contributors += i.avatar_url
  })
  // console.log("Result:", obj[0]);
  console.log(contributors)
}

getRepoContributors("jquery", "jquery", callback);

function downloadImageByURL(url, filePath) {
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
