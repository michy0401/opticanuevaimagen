'use server';
import {prisma} from '@/db/prisma';
import { convertTOPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

//get latest products
export async function getLatestProducts() {
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT, 
        orderBy: {createdAt: 'desc'},
    });

    return convertTOPlainObject(data);
    
}

//get single product by it's slug
export async function getProductBySlug(slug:string) {
    return await prisma.product.findFirst({
        where: {slug:slug},
    })
}