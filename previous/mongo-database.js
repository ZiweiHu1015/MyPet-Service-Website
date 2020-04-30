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
var Database = /** @class */ (function () {
    function Database(collectionName) {
        var _this = this;
        this.MongoClient = require('mongodb').MongoClient;
        this.uri = "mongodb+srv://ZiweiHu1015:01041841Hz@finaldb-ewl75.mongodb.net/test?retryWrites=true&w=majority";
        this.dbName = "finaldb";
        this.collectionName = collectionName;
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    //    public async get(key: string) : Promise<string> {
    //		let db = this.client.db(this.dbName); // this.level(this.dbFile);
    //		let collection = db.collection(this.collectionName);
    //		console.log("get: key = " + key);
    //		let result = await collection.findOne({'Lname' : key });
    //		console.log("get: returned " + JSON.stringify(result));
    //		if (result) {
    //			return result.value;
    //		} else {
    //			return null;
    //		}
    //		}
    Database.prototype.get = function (FName, LName, CityName) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("get key = " + FName + " " + LName + " " + CityName);
                        return [4 /*yield*/, collection.findOne({ 'Fname': FName,
                                'Lname': LName,
                                'City': CityName })];
                    case 1:
                        result = _a.sent();
                        console.log("get returned: " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result.value];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.del = function (Fname, Lname, City) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("delete: key = " + Fname);
                        return [4 /*yield*/, collection.deleteOne({ 'Fname': Fname,
                                'Lname': Lname,
                                'City': City })];
                    case 1:
                        result = _a.sent();
                        console.log("Deleted");
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.search = function (cityName) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("search key = " + cityName);
                        return [4 /*yield*/, collection.findMany({ "City": cityName })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            return [2 /*return*/, result.value];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.put = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("put: key = " + key + ", value = " + value);
                        return [4 /*yield*/, collection.updateOne({ 'name': key }, { $set: { 'value': value } }, { 'upsert': true })];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.update = function (Fname, Lname, City, value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("updating " + Fname + " " + Lname + " at " + City);
                        return [4 /*yield*/, collection.updateOne({ 'Fname': Fname }, { $set: { 'value': value } }, { 'upsert': true })];
                    case 1:
                        result = _a.sent();
                        console.log("update successful: " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.create = function (Fname, Lname, City, value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, doc, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        doc = {
                            'Fname': Fname,
                            'Lname': Lname,
                            'City': City,
                            'value': value
                        };
                        return [4 /*yield*/, collection.insertOne(doc)];
                    case 1:
                        result = _a.sent();
                        //let result = await collection.updateOne({'word':name},{$set: {'img': img, 'languages':{}, 'definition':null}, },{'upsert' : true});
                        console.log("create: word = " + Fname + " " + Lname + " " + City + " " + "Empty Post");
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.isFound = function (userId, LName, cityName) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("isFound: key = " + userId);
                        return [4 /*yield*/, this.get(userId, LName, cityName)];
                    case 1:
                        v = _a.sent();
                        console.log("is found result = " + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
