/*\
title: $:/plugins/oveek/prettyhttplink/modules/server/routes/get-url.js
type: application/javascript
module-type: route

GET /recipes/default/tiddlers/:title

\*/
(function() {

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.method = "POST";

exports.path = /^\/url\/prettyhttplink$/;

exports.handler = function(request,response,state) {
    var http = require("http");
    var https = require("https");
    var reqData = $tw.utils.parseJSONSafe(state.data);
    var urlInfo = {};
    urlInfo.url = reqData.targeturl;
    urlInfo.title = "test link title";

    var responseHtml = "";

    https.get(reqData.targeturl, (response) => {
        console.log(response);
        var body = "";
        response.on('readable', () => {
            body += response.read();
        })
        response.on('end', () => {
            console.log(body);
        })
    });

    state.sendResponse(200, {"Content-Type": "application/json"}, JSON.stringify(urlInfo), "utf8");
};

}());