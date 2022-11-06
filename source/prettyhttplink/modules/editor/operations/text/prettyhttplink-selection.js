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

    const request = new XMLHttpRequest();
    request.open('POST', '/url/prettyhttplink', false);
    request.setRequestHeader('accept', 'application/json');
    request.setRequestHeader('content-type', 'application/json');
    request.setRequestHeader('X-Requested-With', 'TiddlyWiki');
    request.send(JSON.stringify(payload));

    if (request.status === 200) {
        var urlInfo = JSON.parse(request.responseText);
        var title = urlInfo.title.replaceAll(/\|/g, '-');
        var domain = urlInfo.domain.replace(/www\./,'');
        operation.replacement = "[[" + title + "|" + urlInfo.url + "]] " + ",,(" + domain + "),,";
        operation.cutStart = operation.selStart;
        operation.cutEnd = operation.selEnd;
        operation.newSelStart = operation.selStart;
        operation.newSelEnd = operation.selStart + operation.replacement.length;
        console.log(request.responseText);
    }
};

})();