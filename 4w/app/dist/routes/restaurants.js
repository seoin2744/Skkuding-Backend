"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurants_1 = require("../data/restaurants");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(restaurants_1.Restaurants);
});
router.get('/search', function (req, res) {
    const { name } = req.query;
    if (typeof name !== 'string' || !name) {
        res.status(404).json({ error: '해당 맛집 정보가 존재하지 않습니다.' });
        return;
    }
    const result = restaurants_1.Restaurants.filter((r) => r.name.includes(name));
    res.json(result);
});
router.post('/', function (req, res) {
    const newRestaurant = req.body;
    const exists = restaurants_1.Restaurants.some((r) => r.name === newRestaurant.name);
    if (exists) {
        res.status(400).json({ error: '이미 해당 맛집 정보가 존재합니다.' });
        return;
    }
    restaurants_1.Restaurants.push(newRestaurant);
    res.status(201).json(newRestaurant);
});
router.delete('/:name', function (req, res) {
    const { name } = req.params;
    const index = restaurants_1.Restaurants.findIndex((r) => r.name === name);
    if (index === -1) {
        res.status(404).json({ error: '해당 맛집 정보가 존재하지 않습니다.' });
        return;
    }
    const deleted = restaurants_1.Restaurants.splice(index, 1)[0];
    res.json(deleted);
});
router.patch('/:name', function (req, res) {
    const { name } = req.params;
    const updates = req.body;
    const restaurant = restaurants_1.Restaurants.find((r) => r.name === name);
    if (!restaurant) {
        res.status(404).json({ error: '해당 맛집 정보가 존재하지 않습니다.' });
        return;
    }
    if (updates.name)
        restaurant.name = updates.name;
    if (updates.address)
        restaurant.address = updates.address;
    if (updates.phone)
        restaurant.phone = updates.phone;
    res.json(restaurant);
});
exports.default = router;
//# sourceMappingURL=restaurants.js.map