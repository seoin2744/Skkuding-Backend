import express from 'express';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const router = express.Router();
const usersPath = path.resolve('data/users.json');

function loadUsers() {
    const data = fs.readFileSync(usersPath, 'utf-8');
    return JSON.parse(data);
}

function saveUsers(users) {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

// 회원가입
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    const exists = users.find(user => user.username === username);
    if (exists) {
        return res.status(400).json({ error: '이미 존재하는 사용자입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    saveUsers(users);

    res.status(201).json({ message: '회원가입 성공', username });
});

// 로그인
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    res.json({ message: '로그인 성공', username });
});

export default router;
