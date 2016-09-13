const request = require("request");
require("dotenv").config();


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
        if (response.statusCode === 401) {
            console.log("Incorrect token in .env file!")
            return
        }
        if (response.statusCode === 404) {
            console.log("404: Page not found! Am I blind?!")
            return
        }
        if (err) {
            throw err }
        var parsedBody = JSON.parse(body);
        callback(parsedBody)
    });
};

module.exports = getRepoContributors;
