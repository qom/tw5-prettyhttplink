/*\
title: $:/plugins/oveek/prettylink/modules/server/routes/get-url.js
type: application/javascript
module-type: route

GET /recipes/default/tiddlers/:title

\*/
(function() {

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.method = "GET";

exports.path = /^\/recipes\/default\/tiddlers\/(.+)$/;

exports.handler = function(request,response,state) {

};

}());