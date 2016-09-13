const http = require("http");
const request = require("request");
const fs = require("fs");
require("dotenv").config();

var repoOwner = process.env.repoOwner;
var repoName = process.env.repoName;
var pathInput = ("userpics/").replace(/\/$/, "");


function githubRequest(endpoint, callback) {
    var requestData = {
        url: `https://api.github.com${endpoint}`,
        auth: {
            'bearer': process.env.USR_TOKEN
        },
        headers: {
            'User-Agent': 'gimmie cause i said so! ... please?'
        }
    }
    request.get(requestData, callback)
};

function getRepoContributors(repoOwner, repoName, callback) {

    githubRequest(`/repos/${repoOwner}/${repoName}/contributors`, (err, response, body) => {
        var parsedBody = JSON.parse(body);
        callback(parsedBody)
    });
}


function downloadImageByURL(pathInput) {
getRepoContributors(repoOwner, repoName, (input) => {
        input.forEach(function(cv) {
            picRequestData = {
                url: cv.avatar_url,
                auth: {
                    'bearer': process.env.USR_TOKEN
                },
                headers: {
                    'User-Agent': 'gimmie cause i said so! ... please?'
                }
            }
            if (!fs.existsSync("userpics")) {
                fs.mkdirSync("userpics")
            };
            request(picRequestData).pipe(fs.createWriteStream(`./${pathInput}/${cv.login}.jpg`))
        })
    })
}

    /*
            return {
                "name": cv.login,
                "avatarLocation": cv.avatar_url
            }*/
    //getRepoContributors(repoOwner, repoName, /*process.argv[2], process.argv[3],*/ console.log);
