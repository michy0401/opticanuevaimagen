'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { CartItem } from "@/types";
import { toast } from "sonner";

import { addItemToCart } from "@/lib/actions/cart-actions";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message); // puedes usar toast.error o toast(<div>...</div>) según el diseño
      return;
    }

    toast(`${item.name} added to cart`, {
      action: {
        label: "Go to Cart",
        onClick: () => router.push('/cart'),
      },
    });

    
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus/>Add to Cart
    </Button>
  );
};

export default AddToCart;
