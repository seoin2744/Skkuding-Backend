export interface User {
  username: string;
  password: string; // bcrypt로 해싱된 비밀번호
}

export const Users: User[] = [
  {
    username: "testuser",
    password: "$2b$10$NQp3bjsjrRTMnsngYNSx.umF5IHO/cMvqG0AoU06WAC1x5roaKyGy"
  }
];