import {z} from 'zod';
import { insertProductScheme } from '@/lib/validators';

export type Product = z.infer<typeof insertProductScheme> & {
    id: string;
    rating: string;
    createdAt: Date;
    
}