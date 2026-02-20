import { Product } from "../api";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  qte_stock: number;
}

const CART_KEY = "cart";

// Récupérer panier
export function getCart(): CartItem[] {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function getCartCount(): number {
  const cart = getCart();
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}



// Sauvegarder panier
export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Ajouter produit
export function addToCart(product: Product) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product._id);

  if (existing) {
    if (existing.quantity < product.qte_stock) {
      existing.quantity += 1;
    }
  } else {
    cart.push({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      qte_stock: product.qte_stock,
    });
  }

  saveCart(cart);
  window.dispatchEvent(new Event("storage"));
}

// Supprimer produit
export function removeFromCart(id: string) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  window.dispatchEvent(new Event("storage"));
}