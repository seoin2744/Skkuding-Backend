import express from 'express';
import restaurantRoutes from './routes/restaurants.js';
import fs from 'fs';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/auth', authRoutes);

// IP 로그 미들웨어
app.use((req, res, next) => {
    console.log(`요청 IP: ${req.ip}, 요청 경로: ${req.originalUrl}`);
    next();
});

app.use('/restaurants', restaurantRoutes);

// 404 핸들러
app.use(function(req, res, next) {
    res.status(404).json({ error: '요청하신 페이지를 찾을 수 없습니다.' });
  });

// 500 에러 핸들러
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '서버 내부 오류.' });
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});