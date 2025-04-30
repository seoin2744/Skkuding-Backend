import express, { Request, Response } from 'express';
import { Restaurants, Restaurant } from '../data/restaurants'; 

const router = express.Router();

// 전체 맛집 목록 반환
router.get('/', (_req: Request, res: Response) => {
  res.json(Restaurants);
});

// 이름으로 맛집 검색
router.get('/search', function (
  req: Request<unknown, unknown, unknown, { name?: string }>,
  res: Response
): void {
  const { name } = req.query;

  if (typeof name !== 'string' || !name) {
    res.status(404).json({ error: '해당 맛집 정보가 존재하지 않습니다.' });
    return;
  }

  const result = Restaurants.filter((r) => r.name.includes(name));
  res.json(result);
});

// 새로운 맛집 추가
router.post('/', function (
  req: Request<unknown, unknown, Restaurant>,
  res: Response
): void {
  const newRestaurant = req.body;

  const exists = Restaurants.some((r) => r.name === newRestaurant.name);
  if (exists) {
    res.status(400).json({ error: '이미 해당 맛집 정보가 존재합니다.' });
    return;
  }

  Restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
});

// 이름으로 맛집 삭제
router.delete('/:name', function (
  req: Request<{ name: string }>,
  res: Response
): void {
  const { name } = req.params;
  const index = Restaurants.findIndex((r) => r.name === name);

  if (index === -1) {
    res.status(404).json({ error: '해당 맛집 정보가 존재하지 않습니다.' });
    return;
  }

  const deleted = Restaurants.splice(index, 1)[0];
  res.json(deleted);
});

// 이름으로 맛집 정보 수정
router.patch('/:name', function (
  req: Request<{ name: string }, unknown, Partial<Restaurant>>,
  res: Response
): void {
  const { name } = req.params;
  const updates = req.body;
  const restaurant = Restaurants.find((r) => r.name === name);

  if (!restaurant) {
    res.status(404).json({ error: '해당 맛집 정보가 존재하지 않습니다.' });
    return;
  }

  if (updates.name) restaurant.name = updates.name;
  if (updates.address) restaurant.address = updates.address;
  if (updates.phone) restaurant.phone = updates.phone;

  res.json(restaurant);
});

export default router;
