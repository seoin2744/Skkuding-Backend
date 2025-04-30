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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../data/users");
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const exists = users_1.Users.find((user) => user.username === username);
    if (exists) {
        res.status(400).json({ error: '이미 존재하는 사용자입니다.' });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    users_1.Users.push({ username, password: hashedPassword });
    res.status(201).json({ message: '회원가입 성공', username });
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = users_1.Users.find((u) => u.username === username);
    if (!user) {
        res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        return;
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
        return;
    }
    res.json({ message: '로그인 성공', username });
}));
exports.default = router;
//# sourceMappingURL=auth.js.map