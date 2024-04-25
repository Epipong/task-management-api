import { User } from '@prisma/client';

const user: User = {
  id: 1,
  email: 'john.doe@club.com',
  username: 'john.doe',
  role: 'USER',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  password: 'Password@1'
};

export default user;
