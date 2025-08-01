import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//convert prisma object into a regular js object

export function convertTOPlainObject<T>(value:T):T{
  return JSON.parse(JSON.stringify(value));
}

//format number with decimals places
export function formatNumberWithDecimal(num:number):string{
  const [int, decimal] =num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`
}

//format errors
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError (error: any){
  
  if (error?.name === 'ZodError') {
    // Maneja tanto `errors` (viejo) como `issues` (nuevo)
    const errors = error.issues || error.errors || [];
    return Array.isArray(errors) 
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? errors.map((e: any) => e.message).join('. ')
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
      : Object.values(errors).map((e: any) => e.message).join('. ');


  }else if (error.name === 'PrismaClientKnownRequestError' && error.code ==='P2002'){
    //handle prisma error
    const field = error.meta?.target ? error.meta.target[0] : 'Field';
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;

  } else{
    //handle others errors
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message)

  }
}

//round numer to 2 a decimal places
export function round2(value: number | string){
  if (typeof value === 'number'){

    return Math.round((value + Number.EPSILON) * 100)/ 100;

  } else if (typeof value === 'string'){
    
    return Math.round((Number(value) + Number.EPSILON) * 100)/ 100;

  }else{
    throw new Error('Value is not a number or string')
  }
}

const CURRENCY_FORMATER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2
});

//format currency using formater above

export function formatCurrency(amount: number | string | null) {
  if (typeof amount === 'number'){
    return CURRENCY_FORMATER.format(amount);
  } else if (typeof amount === 'string'){
    return CURRENCY_FORMATER.format(Number(amount));

  } else{
    return 'NaN';
  }
}