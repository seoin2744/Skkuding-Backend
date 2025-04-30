import express, { Request, Response } from 'express';
import fs from 'fs';
import bcrypt from 'bcrypt';
import { Users, User } from '../data/users';


const router = express.Router();

// 회원가입
router.post('/signup', async ( req: Request<{}, {}, User>, res: Response ): Promise<void> => {
    const { username, password } = req.body;

    const exists = Users.find((user) => user.username === username);
    if (exists) {
        res.status(400).json({ error: '이미 존재하는 사용자입니다.' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    Users.push({ username, password: hashedPassword }); // 메모리 상에 추가만 됨

    res.status(201).json({ message: '회원가입 성공', username });
  }
);
  
// 로그인
router.post('/login', async ( req: Request<{}, {}, User>,res: Response): Promise<void> => {
    const { username, password } = req.body;

    const user = Users.find((u) => u.username === username);
    if (!user) {
        res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
        return;
    }

    res.json({ message: '로그인 성공', username });
  }
);
  
  export default router;