require("dotenv").config();
const request = require("request");
const fs = require("fs");
const getRepoContributors = require("./gitReq");

function downloadImageByURL(repoOwner, repoName, pathInput) {

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
            if (!fs.existsSync(`${pathInput}`)) {
                fs.mkdirSync(`${pathInput}`)
                console.log(`I coouldnt find the path you asked for so I made one at ./${pathInput}`)
            };
            request(picRequestData).pipe(fs.createWriteStream(`./${pathInput}/${cv.login}.jpg`))
        })
    })
};

module.exports = downloadImageByURL
