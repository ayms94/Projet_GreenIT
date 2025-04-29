<!-- src/views/Cart.vue -->
<template>
    <section class="cart-page container">
      <h2>Mon panier</h2>
  
      <p v-if="cartItems.length === 0" class="empty">Votre panier est vide.</p>
  
      <table v-else class="cart-table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.price.toFixed(2) }} €</td>
            <td>{{ item.quantity }}</td>
            <td>{{ (item.price * item.quantity).toFixed(2) }} €</td>
            <td>
              <button class="btn small danger" @click="remove(item.id)">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="cartItems.length > 0" class="cart-summary">
        <p>Total à payer : <strong>{{ cartTotal.toFixed(2) }} €</strong></p>
        <button class="btn" @click="checkout">Payer</button>
      </div>
    </section>
  </template>
  
  <script setup>
  import { cartItems, cartTotal, removeFromCart, clearCart } from '../stores/cart'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  function remove(id) {
    removeFromCart(id)
  }
  function checkout() {
    alert(`Paiement simulé : ${cartTotal.value.toFixed(2)} €`)
    clearCart()
    router.push({ name: 'Home' })
  }
  </script>
  
  <style scoped>
  .cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: var(--spacing);
  }
  .cart-table th,
  .cart-table td {
    padding: 0.5rem;
    border: 1px solid #ddd;
    text-align: center;
  }
  .cart-summary {
    text-align: right;
  }
  .empty {
    text-align: center;
    color: var(--color-text-light);
  }
  </style>
  