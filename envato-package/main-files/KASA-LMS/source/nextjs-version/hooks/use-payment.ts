"use client";

import { useCartStore } from "@/store/cart-store";
import { orderClientService } from "@/services/orders/order.client";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-handler";
import { z } from "zod";
import { checkoutSchema } from "@/schemas/checkout";
import { useRouter } from "next/navigation";

export const usePayment = () => {
  const router = useRouter();

  const clearCart = useCartStore((s) => s.clearCart);

  // 🔥 ALWAYS fresh state (IMPORTANT)
  const getCartState = () => useCartStore.getState();

  // ===============================
  // 🥇 INITIATE PAYMENT
  // ===============================
  const initiatePayment = async (
    data: z.infer<typeof checkoutSchema>,
    provider: string,
  ) => {
    try {
      const {
        cartItems,
        finalAmount,
        autoDiscount,
        manualDiscount,
        autoCoupon,
        manualCoupon,
      } = getCartState();

      if (!cartItems.length) {
        toast.error("Cart is empty");
        return;
      }

      const originalPrice = cartItems.reduce((t, i) => {
        const price = Number(i.price);
        return t + (Number.isFinite(price) ? price : 0);
      }, 0);

      // 🔥 FINAL PAYABLE (after discount)
      const totalAmount =
        autoDiscount + manualDiscount > 0
          ? Math.max(finalAmount, 0)
          : originalPrice;

      // 🔥 REVERSE GST (consistent with your UI)
      const subTotal = Math.round(totalAmount / 1.18);
      const tax = totalAmount - subTotal;

      const payload = {
        items: cartItems.map((item) => ({
          courseId: item.id,
          quantity: 1,
        })),

        billingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          country: data.country,
          state: data.state,
          city: data.city,
          pincode: data.pincode,
        },

        // 🔥 PRICING
        discount: autoDiscount + manualDiscount, // coupon
        subTotal, // GST removed
        tax, // GST part
        totalAmount, // final payable
        manualCouponCode: manualCoupon || null,
        autoCouponCode: autoCoupon || null,

        paymentMethod: provider,
      };

      const res = await orderClientService.create(payload);
      const courses = res.data.courses || cartItems;

      toast.success("Demo order placed successfully");
      clearCart();

      if (courses.length === 1 && courses[0]?.slug) {
        router.push(`/course/${courses[0].slug}/learn`);
      } else {
        router.push("/my-courses");
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  // ===============================
  // 🥈 RETRY PAYMENT
  // ===============================
  const retryPayment = async (
    orderId: number,
    data: z.infer<typeof checkoutSchema>,
  ) => {
    try {
      const res = await orderClientService.retry(orderId);
      const courses = res.data.courses || [];

      toast.success("Demo payment retry completed");

      if (courses.length === 1 && courses[0]?.slug) {
        router.push(`/course/${courses[0].slug}/learn`);
      } else {
        router.push("/my-courses");
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    initiatePayment,
    retryPayment,
  };
};
