'use client';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { ShippingAddress } from "@/types";
import { shippingAddressSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form";
import {z} from 'zod';
import { shippingAddressDefaultValues } from "@/lib/constants";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserAddress } from "@/lib/actions/user.action";

const ShippingAddressForm =( {address}: {address: ShippingAddress} )=> {

    const router = useRouter();
    
    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || shippingAddressDefaultValues,
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async(values) => {
        
        startTransition(async() => {
            const res = await updateUserAddress(values);

            if (!res.success) {
                toast.error(res.message); // puedes usar toast.error o toast(<div>...</div>) según el diseño
                return;
            }
            router.push('/payment-method')
        })
    };
    

    return <>
        <div className="max-w-md mx-auto space-y-4">
            <h1 className="h2-bold mt-4">Shipping Address</h1>
            <p className="text-sm text-muted-foreground">Please enter an address to ship to</p>
            <Form {...form}>
                <form method='post' className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field } : {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'fullName' >}) => (
                                <FormItem className="w-full ">
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter full name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="streetAddress"
                            render={({ field } : {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'streetAddress' >}) => (
                                <FormItem className="w-full ">
                                    <FormLabel>Street Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter street Address" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field } : {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'city' >}) => (
                                <FormItem className="w-full ">
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your city" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field } : {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'postalCode' >}) => (
                                <FormItem className="w-full ">
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your postal code" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field } : {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'country' >}) => (
                                <FormItem className="w-full ">
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your country" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader className="w-4 h-4 animate-spin" />
                                
                            ) : (
                                <ArrowRight className="w-4 h-4"/>
                            )} Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    
    
    </>;
}
 
export default ShippingAddressForm;