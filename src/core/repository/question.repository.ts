import { Question } from '../entity/questions.entity';
import type { Repository } from 'typeorm';

export type QuestionRepository = Repository<Question>;