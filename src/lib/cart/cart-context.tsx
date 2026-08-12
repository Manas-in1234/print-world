"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  shapeId?: string;
  shapeName?: string;
  imageKey?: string;
  quantity: number;
  unitPrice: number;
  customizationData?: object;
  savedDesignId?: string;
}

interface CartActions {
  addItem: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

interface CartContextValue extends CartActions {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "print-world-cart";

const EMPTY_CART: CartItem[] = [];

const listeners = new Set<() => void>();
let clientSnapshot: CartItem[] = EMPTY_CART;
let hydrated = false;

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_CART;
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

function persistCart(items: CartItem[]) {
  clientSnapshot = items.length > 0 ? items : EMPTY_CART;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  if (!hydrated) {
    hydrated = true;
    clientSnapshot = loadCartFromStorage();
    queueMicrotask(() => listeners.forEach((l) => l()));
  }
  return clientSnapshot;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function cartItemKey(item: Pick<CartItem, "productId" | "variantId" | "shapeId" | "savedDesignId">) {
  return `${item.productId}:${item.variantId ?? ""}:${item.shapeId ?? ""}:${item.savedDesignId ?? ""}`;
}

function addItemImpl(item: Omit<CartItem, "id">) {
  const current = getSnapshot();
  const key = cartItemKey(item);
  const existing = current.find(
    (i) =>
      cartItemKey(i) === key &&
      (item.savedDesignId || !item.customizationData || !i.customizationData),
  );
  if (existing && !item.customizationData) {
    persistCart(
      current.map((i) =>
        i.id === existing.id
          ? { ...i, quantity: i.quantity + item.quantity }
          : i,
      ),
    );
  } else {
    persistCart([...current, { ...item, id: crypto.randomUUID() }]);
  }
}

const cartActions: CartActions = {
  addItem: (item) => addItemImpl(item),
  updateQuantity: (id, quantity) => {
    const current = getSnapshot();
    if (quantity < 1) {
      persistCart(current.filter((i) => i.id !== id));
      return;
    }
    persistCart(current.map((i) => (i.id === id ? { ...i, quantity } : i)));
  },
  removeItem: (id) => persistCart(getSnapshot().filter((i) => i.id !== id)),
  clearCart: () => persistCart([]),
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isHydrated = hydrated;

  const addItem = useCallback((item: Omit<CartItem, "id">) => addItemImpl(item), []);
  const updateQuantity = useCallback((id: string, quantity: number) => {
    cartActions.updateQuantity(id, quantity);
  }, []);
  const removeItem = useCallback((id: string) => {
    cartActions.removeItem(id);
  }, []);
  const clearCart = useCallback(() => {
    cartActions.clearCart();
  }, []);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    return {
      items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      isHydrated,
    };
  }, [items, addItem, updateQuantity, removeItem, clearCart, isHydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/** Subscribe only to cart item count — avoids re-rendering on unrelated cart fields. */
export function useCartItemCount(): number {
  return useSyncExternalStore(
    subscribe,
    () => getSnapshot().reduce((sum, i) => sum + i.quantity, 0),
    () => 0,
  );
}

/** Stable cart actions without subscribing to items array. */
export function useCartActions(): CartActions {
  return cartActions;
}

/** Hydration flag for cart badge display. */
export function useCartHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => hydrated,
    () => false,
  );
}
