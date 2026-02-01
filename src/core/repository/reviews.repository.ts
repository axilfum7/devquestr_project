import { Review } from '../entity/reviews.entity';
import type { Repository } from 'typeorm';

export type ReviewRepository = Repository<Review>;