import { User } from '../entity/users.entity';
import type { Repository } from 'typeorm';

export type UserRepository = Repository<User>;