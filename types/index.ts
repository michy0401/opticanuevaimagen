import {z} from 'zod';
import { insertProductScheme, insertCartSchema, cartItemSchema, shippingAddressSchema } from '@/lib/validators';

export type Product = z.infer<typeof insertProductScheme> & {
    id: string;
    rating: string;
    createdAt: Date;
    
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
