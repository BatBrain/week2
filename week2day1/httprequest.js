var request = require("request");

function printExampleHTML(_onData) {

    request("http://www.google.com", function(err, response, body) {
        if (err) {
            throw err;
        }
        _onData(body);
    });
};

printExampleHTML(console.log);