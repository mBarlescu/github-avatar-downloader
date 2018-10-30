var request = require('request');
var secret = require('./secrets.js');
var fs = require('fs');

var myargs = process.argv.slice(2)

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN,
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
    downloadImageByURL(i.avatar_url, 'avatars/' + i.login + '.jpg')
  })


  // console.log("Result:", obj[0]);
  console.log(contributors)
}

getRepoContributors(myargs[0], myargs[1], callback);

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
