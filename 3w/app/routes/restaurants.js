import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dataPath = path.resolve('data/restaurants.json');

// 기존 JSON 파일에서 데이터 읽기
function loadData() {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
}

// 데이터 저장
function saveData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// 전체 맛집 목록 반환
router.get('/', (req, res) => {
    const data = loadData();
    res.json(data);
});

// 이름으로 맛집 검색 (query string)
router.get('/search', (req,res)=> {
    const {name} = req.query;
    const data = loadData();
    
    if (!name) {
        return res.status(404).json({error : ' 해당 맛집 정보가 존재하지 않습니다.'});
    }

    const result = data.filter(restaurant => restaurant.name && restaurant.name.includes(name));

    res.json(result);
});

// 새로운 맛집 추가 
router.post('/', (req,res)=> {
    const newRestaurant = req.body;
    const data = loadData();

    const exists = data.some(restaurant=>
        restaurant.name === newRestaurant.name
    );

    if (exists) {
        return res.status(400).json({
            "error": "이미 해당 맛집 정보가 존재합니다."
        });
    }

    data.push(newRestaurant);
    saveData(data);

    res.status(201).json(newRestaurant);
});

// 이름으로 맛집 삭제
router.delete('/:name', (req, res) => {
    const name = req.params.name;
    const data = loadData();

    const index = data.findIndex(restaurant => restaurant.name === name);

    if (index === -1) {
        return res.status(404).json({ error: '해당 맛집 정보가 존재하지 않습니다.' });
    }

    const deleted = data[index];
    data.splice(index, 1);
    saveData(data);

    res.json(deleted);
});


// 이름으로 맛집 정보 수정
router.patch('/:name', (req, res) => {
    const name  = req.params.name;
    const updates = req.body;
    const data = loadData();
    const restaurant = data.find(restaurant=>restaurant.name === name);
    
    if (!restaurant) {
        return res.status(404).json({ error: '해당 맛집 정보가 존재하지 않습니다.' });
    }

    if (updates.name) restaurant.name = updates.name;
    if (updates.address) restaurant.address = updates.address;
    if (updates.phone) restaurant.phone = updates.phone;

    saveData(data);
    res.json(restaurant);
});

export default router;