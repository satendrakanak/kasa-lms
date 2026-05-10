import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { checkoutSchema } from "@/schemas/checkout";
import { User } from "@/types/user";
import { useMemo } from "react";

export const useCheckoutForm = (user: User | null) => {
  const defaultValues = useMemo(() => {
    return {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: "221, Demo Learning Street, Sector 12",
      country: "India",
      state: "Delhi",
      city: "New Delhi",
      pincode: "110001",
    };
  }, [user]);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
    mode: "onChange",
  });

  return form;
};
