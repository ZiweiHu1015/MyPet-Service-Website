'use strict';
exports.__esModule = true;
var database_1 = require("./database");
var myserver_post_1 = require("./myserver-post");
var theDatabase = new database_1.Database('perryguo98'); // CHANGE THIS
var theServer = new myserver_post_1.MyServer(theDatabase);
theServer.listen(8080);
