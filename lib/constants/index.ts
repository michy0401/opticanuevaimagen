
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME||'Optica Nueva Imagen';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION ||'Your vision, our priority';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://localhost:3000';

export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT)||4;


export const signInDefaultValues = {
    email:'admin@example.com',
    password: '123456',

};

export const signUpDefaultValues = {
    name:'',
    email:'',
    password: '',
    confirmPassword:'',

};

export const shippingAddressDefaultValues = {
    fullName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: ''
} 