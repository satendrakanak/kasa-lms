"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN").format(Number.isFinite(value) ? value : 0);

export function CartPreviewSheet() {
  const cartItems = useCartStore((state) => state.cartItems);
  const isOpen = useCartStore((state) => state.isCartSheetOpen);
  const setOpen = useCartStore((state) => state.setCartSheetOpen);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.totalPrice());

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full gap-0 border-l border-border bg-background p-0 sm:max-w-[460px]"
      >
        <SheetHeader className="border-b border-border bg-card px-5 py-5">
          <div className="flex items-start gap-3 pr-10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
              <ShoppingCart className="h-5 w-5" />
            </span>
            <div>
              <SheetTitle className="text-xl font-semibold">
                Cart Preview
              </SheetTitle>
              <SheetDescription>
                {cartItems.length
                  ? `${cartItems.length} course${cartItems.length > 1 ? "s" : ""} selected`
                  : "Your cart is empty"}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          {cartItems.length ? (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const image = item.image || "/assets/default-cover.jpg";
                const slug = item.slug || "full-stack-nextjs-mastery";
                const price = Number(item.price);

                return (
                  <div
                    key={`${item.id}-${slug}`}
                    className="rounded-3xl border border-border bg-card p-3 shadow-sm"
                  >
                    <div className="flex gap-3">
                      <Link
                        href={`/course/${slug}`}
                        onClick={() => setOpen(false)}
                        className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl bg-muted"
                      >
                        <Image
                          src={image}
                          alt={item.title || "Cart course"}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/course/${slug}`}
                          onClick={() => setOpen(false)}
                          className="line-clamp-2 text-sm font-semibold leading-5 text-card-foreground transition hover:text-primary"
                        >
                          {item.title || "Demo Course"}
                        </Link>
                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                          By {item.instructor || "Kasa Faculty"}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                            <Clock3 className="h-3 w-3" />
                            {item.totalDuration || "Self paced"}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                            <BookOpen className="h-3 w-3" />
                            {item.totalLectures || 0} lessons
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-base font-bold text-primary">
                        ₹{formatPrice(price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-3 text-xs font-semibold text-destructive transition hover:bg-destructive hover:text-white"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-8 text-center">
              <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <ShoppingCart className="h-8 w-8" />
              </span>
              <p className="text-lg font-semibold text-card-foreground">
                Cart is empty
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Add a paid course and it will appear here instantly.
              </p>
            </div>
          )}
        </div>

        <SheetFooter className="border-t border-border bg-card p-5">
          <div className="mb-2 flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
            <span className="text-sm font-semibold text-card-foreground">
              Total
            </span>
            <span className="text-xl font-bold text-primary">
              ₹{formatPrice(total)}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <SheetClose asChild>
              <Button asChild variant="outline" className="h-11 rounded-full">
                <Link href="/courses">Continue</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                asChild
                className={
                  cartItems.length
                    ? "h-11 rounded-full bg-primary text-primary-foreground"
                    : "h-11 pointer-events-none rounded-full bg-primary text-primary-foreground opacity-50"
                }
              >
                <Link href="/checkout">
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </SheetClose>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <SheetClose asChild>
              <Button asChild variant="ghost" className="h-10 rounded-full">
                <Link href="/cart">Open full cart</Link>
              </Button>
            </SheetClose>
            <Button
              type="button"
              variant="ghost"
              className="h-10 rounded-full text-destructive hover:text-destructive"
              disabled={!cartItems.length}
              onClick={clearCart}
            >
              Clear cart
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
