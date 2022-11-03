/*\
title: $:/plugins/oveek/modules/editor/operations/text/prettyhttplink-selection.js
type: application/javascript
module-type: texteditoroperation

Text editor operation to wrap the selection with the specified prefix and suffix

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports["prettyhttplink-selection"] = function(event,operation) {

    var payload = {
        targeturl: operation.selection
    }

    console.log("Hello from prettyhttplink.");
    $tw.utils.httpRequest({
        url: "/url/prettyhttplink",
        type: "POST",
        data: JSON.stringify(payload),
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        },
        callback: function(err, response, httpRequest) {
            console.log(response);
        }

    })

};

})();