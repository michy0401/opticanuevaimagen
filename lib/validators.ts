import {z} from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z
.string()
.refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must have exactly two decimal places'
);


//esquema paara insertar productos
export const insertProductScheme = z.object({
    name: z.string().min(3, 'Name must be at least 3 charaters'),
    slug: z.string().min(3, 'Slug must be at least 3 charaters'),
    category: z.string().min(3, 'Category must be at least 3 charaters'),
    brand: z.string().min(3, 'Brand must be at least 3 charaters'),
    description: z.string().min(3, 'Description must be at least 3 charaters'),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, 'Product must have at least one image'),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
});


//schema for sign in
export const signInFormScheme = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

//schema for sign up
export const signUpFormScheme = z.object({
    name: z.string().min(3, 'Name must be 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});


//cart Schemas
export const cartItemSchema = z.object({
    productId: z.string().min(1, 'Product is required'),
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    qty: z.number().int().nonnegative('Quantity must be a positive number'),
    image: z.string().min(1, 'Image is required'),
    price: currency,
});

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, 'Session cart id is equired'),
    userId: z.string().optional().nullable(),
});