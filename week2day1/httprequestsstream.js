var http = require("http");
var fs = require("fs");



function printExampleHTML(_onData) {
    var requestOptions = {
        host: "google.com",
        path: "/"
    };

    http.get(requestOptions, (response) => { // HTTP Response Callback

        response.setEncoding("utf8"); // Use UTF-8 encoding

        response.on("data", _onData);

        response.on("end", function() { // On Data Completed
            console.log("Response stream complete.");
        });

    });
};

printExampleHTML(function(data) {
    console.log(data)
});
