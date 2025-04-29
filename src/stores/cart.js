// src/stores/cart.js
import { ref, computed, watch } from 'vue'

// Charge depuis localStorage ou initialise vide
const saved = localStorage.getItem('cart')
export const cartItems = ref(saved ? JSON.parse(saved) : [])

// Sauvegarde à chaque changement
watch(
  cartItems,
  val => localStorage.setItem('cart', JSON.stringify(val)),
  { deep: true }
)

// Ajouter un produit (ou incrémenter)
export function addToCart(prod) {
  const idx = cartItems.value.findIndex(i => i.id === prod.id)
  if (idx >= 0) {
    cartItems.value[idx].quantity++
  } else {
    cartItems.value.push({ ...prod, quantity: 1 })
  }
}

// Supprimer un item du panier
export function removeFromCart(id) {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}

// Vider le panier
export function clearCart() {
  cartItems.value = []
}

// Total du panier
export const cartTotal = computed(() =>
  cartItems.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
)
