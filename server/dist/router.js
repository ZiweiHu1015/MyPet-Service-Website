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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var jsonwebtoken_1 = require("jsonwebtoken");
var mongodb_1 = require("mongodb");
var express_1 = require("express");
var models_1 = __importDefault(require("./models"));
var model = new models_1.default();
var privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, './secret.key'));
console.log('>> The private key has been read!');
var generateToken = function (name) {
    try {
        return jsonwebtoken_1.sign({
            sub: name,
            iat: new Date().getTime()
        }, privateKey, {
            issuer: 'sha',
            expiresIn: '1h'
        });
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
var verifyToken = function (token) {
    try {
        return jsonwebtoken_1.verify(token, privateKey);
    }
    catch (err) {
        console.error('>> Invalid token!');
    }
    return false;
};
var router = express_1.Router();
var userCollection = 'User';
router.post('/sign-in', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var signInData, userRecord, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                signInData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, model.getUserByName(userCollection, 'username', signInData.username)];
            case 2:
                userRecord = _a.sent();
                if (signInData.password === userRecord.password) {
                    userRecord.token = generateToken(userRecord.username);
                    res.status(200).json({
                        data: userRecord,
                        msg: 'sign-in success.'
                    });
                }
                else {
                    res.status(401).json({
                        msg: 'Your account does not exist or password error, please try again!'
                    });
                }
                return [3, 4];
            case 3:
                err_1 = _a.sent();
                res.status(401).json({
                    msg: 'Your account does not exist or password error, please try again!'
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
router.post('/sign-up', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var signUpData, existUser, newUserResult, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                signUpData = req.body;
                return [4, model.getUserByName(userCollection, 'username', signUpData.username)];
            case 1:
                existUser = _a.sent();
                if (!existUser) return [3, 2];
                res.status(200).json({
                    msg: 'The account has been registered!'
                });
                return [3, 4];
            case 2: return [4, model.put(userCollection, signUpData)];
            case 3:
                newUserResult = _a.sent();
                newUser = newUserResult.ops[0];
                newUser.token = generateToken(newUser.username);
                res.status(200).json({
                    data: newUser,
                    msg: 'sign-up success.'
                });
                _a.label = 4;
            case 4: return [2];
        }
    });
}); });
router.use(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, allow;
    return __generator(this, function (_a) {
        if (req.method === 'OPTIONS') {
            res.send(204);
        }
        else {
            token = req.headers.authorization;
            if (token) {
                allow = verifyToken(token);
                if (!allow) {
                    res.status(401).json({
                        msg: 'Unauthorized access!'
                    });
                }
                next();
            }
            else {
                res.status(401).json({
                    msg: 'Unauthorized access!'
                });
            }
        }
        return [2];
    });
}); });
router.get('/users', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allRecords;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, model.fetch(userCollection)];
            case 1:
                allRecords = _a.sent();
                res.status(200).json({
                    data: allRecords,
                    msg: "Fetch success!"
                });
                return [2];
        }
    });
}); });
router.post('/users', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var putData, record, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                putData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, model.put(userCollection, putData)];
            case 2:
                record = _a.sent();
                res.status(200).json({
                    data: record.ops[0],
                    msg: "Put success " + putData.firstname
                });
                return [3, 4];
            case 3:
                err_2 = _a.sent();
                res.status(200).json({
                    msg: "Put failed!",
                    error: err_2
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
router.patch('/users', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updateDate, record, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateDate = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!updateDate._id) return [3, 3];
                return [4, model.patch(userCollection, updateDate)];
            case 2:
                record = _a.sent();
                res.status(200).json({
                    data: record,
                    msg: "Edit success " + record._id
                });
                return [3, 4];
            case 3: throw new Error('No _id field');
            case 4: return [3, 6];
            case 5:
                err_3 = _a.sent();
                res.status(200).json({
                    msg: "Edit failed!",
                    error: err_3
                });
                return [3, 6];
            case 6: return [2];
        }
    });
}); });
router.delete('/users/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var delId, err_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                delId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, model.del(userCollection, delId)];
            case 2:
                _b.sent();
                res.status(200).json({
                    msg: "Delete success!"
                });
                return [3, 4];
            case 3:
                err_4 = _b.sent();
                res.status(200).json({
                    msg: "Delete failed!",
                    error: err_4
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
router.get('/users/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var searchId, record, err_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                searchId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, model.get(userCollection, searchId)];
            case 2:
                record = _b.sent();
                res.status(200).json({
                    data: record,
                    msg: "Get success!"
                });
                return [3, 4];
            case 3:
                err_5 = _b.sent();
                res.status(200).json({
                    msg: "Get failed!",
                    error: err_5
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
var petCollection = 'Pet';
router.get('/pets', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allRecords;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, model.fetch(petCollection)];
            case 1:
                allRecords = _a.sent();
                res.status(200).json({
                    data: allRecords,
                    msg: "Fetch success!"
                });
                return [2];
        }
    });
}); });
router.post('/pets', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var putData, record, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                putData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (putData.userId) {
                    putData.userId = new mongodb_1.ObjectID(putData.userId);
                }
                return [4, model.put(petCollection, putData)];
            case 2:
                record = _a.sent();
                res.status(200).json({
                    data: record.ops[0],
                    msg: "Put success " + putData.name
                });
                return [3, 4];
            case 3:
                err_6 = _a.sent();
                res.status(200).json({
                    msg: "Put failed!",
                    error: err_6
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
router.patch('/pets', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updateDate, record, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateDate = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!updateDate._id) return [3, 3];
                if (updateDate.userId) {
                    updateDate.userId = new mongodb_1.ObjectID(updateDate.userId);
                }
                return [4, model.patch(petCollection, updateDate)];
            case 2:
                record = _a.sent();
                res.status(200).json({
                    data: record,
                    msg: "Edit success " + record._id
                });
                return [3, 4];
            case 3: throw new Error('No _id field');
            case 4: return [3, 6];
            case 5:
                err_7 = _a.sent();
                res.status(200).json({
                    msg: "Edit failed!",
                    error: err_7
                });
                return [3, 6];
            case 6: return [2];
        }
    });
}); });
router.delete('/pets/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var delId, err_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                delId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, model.del(petCollection, delId)];
            case 2:
                _b.sent();
                res.status(200).json({
                    msg: "Delete success!"
                });
                return [3, 4];
            case 3:
                err_8 = _b.sent();
                res.status(200).json({
                    msg: "Delete failed!",
                    error: err_8
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
router.get('/pets/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var searchId, record, err_9;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                searchId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, model.get(petCollection, searchId)];
            case 2:
                record = _b.sent();
                res.status(200).json({
                    data: record,
                    msg: "Get success!"
                });
                return [3, 4];
            case 3:
                err_9 = _b.sent();
                res.status(200).json({
                    msg: "Get failed!",
                    error: err_9
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
router.get('/pets/user/:userid', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, records, err_10;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userid = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userid;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, model.getUserDatas(petCollection, userid)];
            case 2:
                records = _b.sent();
                res.status(200).json({
                    data: records,
                    msg: "Get records success!"
                });
                return [3, 4];
            case 3:
                err_10 = _b.sent();
                res.status(200).json({
                    msg: "Get records failed!",
                    error: err_10
                });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=router.js.map