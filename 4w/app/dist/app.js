"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurants_1 = __importDefault(require("./routes/restaurants"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/auth', auth_1.default);
app.use((req, res, next) => {
    console.log(`요청 IP: ${req.ip}, 요청 경로: ${req.originalUrl}`);
    next();
});
app.use('/restaurants', restaurants_1.default);
app.use((req, res, next) => {
    res.status(404).json({ error: '요청하신 페이지를 찾을 수 없습니다.' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
//# sourceMappingURL=app.js.map