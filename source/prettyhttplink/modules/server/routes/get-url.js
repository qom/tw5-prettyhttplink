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
    var reqData = $tw.utils.parseJSONSafe(state.data);
    var urlInfo = {};
    urlInfo.url = reqData.targeturl.replace(/\/$/,"");
    urlInfo.domain = urlInfo.url.match(/http[\S]?:\/\/([^/]*)[/]?/)[1];;
    var headOpenTagCount = 0, headTagSearchIndex = 0;

    function fetchHTMLTitleTag(url, urlData, startByte, endByte, headTagSearchIndex) {
        // Make HTTP req with 'Range' header so we don't have to download the whole page just to retrieve the <title>.
        var byteRange = startByte + '-' + endByte;
        fetch(url, {headers: {'Range': 'bytes=' + byteRange}})
            .then(response => response.text())
            .then(data => {
                urlData += data;

                // Search for occurrences of the <title> tag in the portion of the HTML page we've downloaded so far.
                //var titleTagMatches = [...urlData.matchAll(/<title>(.*)<\/title>/mg)];
                var titleTagMatches = [...urlData.matchAll(/<title>([\S\s]*?)<\/title>/g)];

                if (titleTagMatches.length > 0) {
                    console.log("Retrieved <title>");
                    urlInfo.title = titleTagMatches[0][1];
                    state.sendResponse(200, {"Content-Type": "application/json"}, JSON.stringify(urlInfo), "utf8");
                } else {
                    // Fetch more of the page if we haven't found the <title> yet.
                    console.log("Title tag not found yet. Execute another fetch.")
                    fetchHTMLTitleTag(url, urlData, endByte + 1, endByte + 65536, headTagSearchIndex + "<head>".length);
                }
            });
    }

    fetchHTMLTitleTag(reqData.targeturl, "", 0, 65535, 0);
};

}());