import express from 'express';
import { Request, Response, NextFunction } from 'express';
import restaurantRoutes from './routes/restaurants';
import authRoutes from './routes/auth';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/auth', authRoutes);

// IP 로그 미들웨어
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`요청 IP: ${req.ip}, 요청 경로: ${req.originalUrl}`);
    next();
  });

app.use('/restaurants', restaurantRoutes);

// 404 핸들러
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: '요청하신 페이지를 찾을 수 없습니다.' });
});


// 500 에러 핸들러
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});