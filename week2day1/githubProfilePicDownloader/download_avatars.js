const prompt = require("prompt");
const getRepoContributors = require("./gitReq");
const downloadImageByURL = require("./dwnldURLtoPath")
const fs = require("fs")

if (!fs.existsSync(".env")) {
    console.log(".env file not found!")
    return
}

var prompts = {
    properties: {
        repoOwnerResult: {
            description: 'Enter the Github user that owns the repo you are looking for', // Prompt displayed to the user. If not supplied name will be used.
            type: 'string', // Specify the type of input to expect.
            pattern: /^[\w\_\d\-]+$/, // Regular expression that input must be valid against.
            message: 'Password can only contain letters, numbers, "_" and "-"', // Warning message to display if validation fails.
            required: true // If true, value entered must be non-empty.
        },
        repoNameResult: {
            description: "Enter the repo name",
            type: 'string',
            pattern: /^[\w\_\d\-]+$/,
            message: 'Repo names can only contain numbers letters "_" and "-"',
            required: true
        },
        pathInputResult: {
            description: 'Enter directory where you would like to store the profile pics:',
            type: 'string',
            required: true
        }
    }
}

console.log("Welcome to Sol's fantastic ... thing. Please enter parameters.")

prompt.start();

prompt.get(prompts, (err, result) => {
    if (err) {
        console.log("Invalid Input, try again!")
        prompt.start();
    };
    var repoOwner = result.repoOwnerResult
    var repoName = result.repoNameResult
    var pathInput = result.pathInputResult
    downloadImageByURL(repoOwner, repoName, pathInput.replace(/\/$/, ""));
})
