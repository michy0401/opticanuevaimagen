'use client';
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NotFoundPage = () => {
    return <div className="flex flex-col items-center justify-center min-h-screen">
        <Image src='/images/logo.svg' alt={`${APP_NAME} logo`} width={48} height={48} priority={true} />
        <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold mb-4">Not Found</h1>
            <p className="text-red-600">Could not found requested page</p>
            <Button variant={'outline'} className="mt-4 ml-2" onClick={()=>(window.location.href='/')}>Back To Home</Button>
        </div>
    </div>
}
 
export default NotFoundPage;