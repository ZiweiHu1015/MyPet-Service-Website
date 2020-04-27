"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http = require('http');
var url = require('url');
var express = require('express');
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        var _this = this;
        this.server = express();
        this.port = process.env.PORT;
        this.router = express.Router();
        this.theDatabase = db;
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        // Serve static pages from a particular path.
        this.server.use('/', express.static('./static'));
        this.server.use('/', express.json());
        // Set a single handler for a route.
        this.router.post('/users/:userId/create', this.createHandler.bind(this));
        this.router.post('/users/:City/search', this.searchHandler.bind(this));
        // Set multiple handlers for a route, in sequence.
        this.router.post('/users/:userId/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
        this.router.post('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
        this.router.post('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
        // Set a fall-through handler if nothing matches.
        this.router.post('*', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.send(JSON.stringify({ "result": "command-not-found" }));
                return [2 /*return*/];
            });
        }); });
        // Start up the counter endpoint at '/counter'.
        this.server.use('/pet', this.router);
    }
    MyServer.prototype.errorHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.isFound(request.params['userId'], request.body.Lname, request.body.City)];
                    case 1:
                        value = _a.sent();
                        //	console.log("result from database.isFound: " + JSON.stringify(value));
                        if (!value) {
                            response.write(JSON.stringify({ 'result': 'error' }));
                            response.end();
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.searchHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchPet(request.body.City, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deletePet(request.params['userId'], request.body.Lname, request.body.City, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readPet(request.params['userId'], request.body.Lname, request.body.City, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.createHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createPet(request.params['userId'], request.body.Lname, request.body.City, request.body.value, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.updateHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updatePet(request.params['userId'], request.body.Lname, request.body.City, request.body.value, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    MyServer.prototype.updatePet = function (Fname, Lname, City, value, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("updating at server");
                        return [4 /*yield*/, this.theDatabase.update(Fname, Lname, City, value)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'created',
                            'Fname': Fname,
                            'Lname': Lname,
                            'City': City,
                            'value': value }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.createPet = function (Fname, Lname, City, value, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("creating city named '" + City + "'");
                        return [4 /*yield*/, this.theDatabase.create(Fname, Lname, City, value)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'created',
                            'Fname': Fname,
                            'Lname': Lname,
                            'City': City,
                            'value': value }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.errorCounter = function (Fname, Lname, City, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.write(JSON.stringify({ 'result': 'error' }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.readPet = function (Fname, Lname, City, response) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.get(Fname, Lname, City)];
                    case 1:
                        value = _a.sent();
                        response.write(JSON.stringify({ 'result': 'read',
                            'Fname': Fname,
                            'Lname': Lname,
                            'City': City,
                            'value': value }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.searchPet = function (cityName, response) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.search(cityName)];
                    case 1:
                        value = _a.sent();
                        response.write(JSON.stringify({ 'result': 'search',
                            'City': cityName,
                            'value': value }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deletePet = function (Fname, Lname, City, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.del(Fname, Lname, City)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'deleted',
                            'Fname': Fname,
                            'Lname': Lname }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
