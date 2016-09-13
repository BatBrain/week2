const http = require("http");
const request = require("request");
const fs = require("fs");
require("dotenv").config();

var repoOwner = "lighthouse-labs" //process.argv[2];
var repoName = "laser_shark" //process.argv[3];




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

function downloadImageByURL(url, path) {


}

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
            request(picRequestData).pipe(fs.createWriteStream(`./userpics/${cv.login}.jpg`))
        })
    })
    /*
            return {
                "name": cv.login,
                "avatarLocation": cv.avatar_url
            }*/
    //getRepoContributors(repoOwner, repoName, /*process.argv[2], process.argv[3],*/ console.log);
