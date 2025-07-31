import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./credentials-signin-form";

export const metadata: Metadata = {
    title: 'Sign In'
}

const SignInPage = () => {
    return <div className="w-full max-w-md mx-auto">
        <Card>
            <CardHeader className="space-y-4">
                <Link href='/' className='flex-center'>
                    <Image src='/images/logo.svg' width={100} height={100} alt={`${APP_NAME}`} priority={true}>
                    </Image>
                </Link>
                <CardTitle className="text-center">Sign In</CardTitle>
                <CardDescription className="text-center">
                    Sing in to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/*FORM HERE */}
                <CredentialsSignInForm></CredentialsSignInForm>

            </CardContent>
        </Card>

    </div>
};
 
export default SignInPage;