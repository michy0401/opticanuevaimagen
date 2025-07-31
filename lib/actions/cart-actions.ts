'use server';
import { cookies } from "next/headers";
import { CartItem } from "@/types";
import { convertTOPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema } from "../validators";


export async function addItemToCart(data:CartItem) {
    try {
        //check for cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if(!sessionCartId) throw new Error('Cart session not found');

        //get session and user id
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;

        //get cart
        const cart = await getMyCart();

        //pase and validate
        const item = cartItemSchema.parse(data);

        //find product in data base
        const product = await prisma.product.findFirst({
            where: {id: item.productId}
        })
        
        //testing
        console.log({
            'Session cart id': sessionCartId,
            'user id': userId,
            'Item requested': item,
            'Product found': product
        });
        

        return {
            success:true,
            message: 'Item added to cart'
        };
    
    } catch (error) {
        
        return {
            success:false,
            message: formatError(error)
        };
    }
}

export async function getMyCart() { 
    //check for cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if(!sessionCartId) throw new Error('Cart session not found');

        //get session and user id
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;

        //get user cart from database
        const cart = await prisma.cart.findFirst({
            where: userId ? {userId: userId} : {sessionCartId: sessionCartId}
        });

        if (!cart) return undefined;

        return convertTOPlainObject({
            ...cart,
            items: cart.items as CartItem[],
            itemsPrice: cart.itemsPrice.toString(),
            totalPrice: cart.totalPrice.toString(),
            shippingPrice: cart.shippingPrice.toString(),
            taxPrice: cart.taxPrice.toString(),
        })
}