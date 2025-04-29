<!-- src/App.vue -->
<template>
  <header class="site-header">
    <div class="container nav-container">
      <h1 class="logo">♻️ Green Marketplace</h1>

      <!-- Hamburger pour mobile -->
      <button class="nav-toggle" @click="toggleMobileMenu">
        <span :class="{ open: mobileMenuOpen }"></span>
        <span :class="{ open: mobileMenuOpen }"></span>
        <span :class="{ open: mobileMenuOpen }"></span>
      </button>

      <nav :class="['main-nav', { open: mobileMenuOpen }]">
        <!-- Public -->
        <router-link to="/" @click="closeMobileMenu">Accueil</router-link>
        <router-link to="/catalogue" @click="closeMobileMenu">Catalogue</router-link>

        <!-- Si authentifié -->
        <template v-if="isAuthenticated">
          <router-link to="/products" @click="closeMobileMenu">Mes produits</router-link>
          <router-link to="/stats"    @click="closeMobileMenu">Stats</router-link>
          <router-link to="/contact"  @click="closeMobileMenu">Contact</router-link>
          <span class="nav-greet">Bonjour, {{ user.name }}</span>
          <button class="cart-btn" @click="toggleCart">
            🛒<span v-if="cartItems.length" class="badge">{{ cartItems.length }}</span>
          </button>
          <button class="btn-link" @click="logout">Déconnexion</button>
        </template>

        <!-- Sinon -->
        <template v-else>
          <router-link to="/signup" class="btn-link" @click="closeMobileMenu">Inscription</router-link>
          <router-link to="/login"  class="btn-link" @click="closeMobileMenu">Connexion</router-link>
        </template>
      </nav>
    </div>
  </header>

  <main class="container">
    <router-view />
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2025 Green IT – Tous droits réservés</p>
      <p class="team-names">Ruben – Robin – Aymane – Samy</p>
    </div>
  </footer>

  <!-- Backdrop -->
  <div class="drawer-backdrop" v-if="cartVisible" @click="toggleCart" />

  <!-- Tiroir Panier -->
  <aside class="cart-drawer" :class="{ open: cartVisible }">
    <header class="drawer-header">
      <h3>Mon Panier</h3>
      <button class="close-btn" @click="toggleCart">✖️</button>
    </header>
    <div v-if="cartItems.length === 0" class="empty-drawer">
      Votre panier est vide.
    </div>
    <ul v-else class="drawer-list">
      <li v-for="item in cartItems" :key="item.id" class="drawer-item">
        <div class="item-info">
          <strong>{{ item.name }}</strong>
          <small>{{ item.quantity }} × {{ item.price.toFixed(2) }} €</small>
        </div>
        <button class="btn small danger" @click="removeFromCart(item.id)">🗑️</button>
      </li>
    </ul>
    <footer v-if="cartItems.length" class="drawer-footer">
      <div class="total">Total : {{ cartTotal.toFixed(2) }} €</div>
      <button class="btn checkout" @click="checkout">Payer</button>
    </footer>
  </aside>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, isAuthenticated, setUser } from './stores/user'
import { cartItems, cartTotal, removeFromCart, clearCart } from './stores/cart'
import { removeProduct } from './stores/products'  // ← IMPORT pour retirer du catalogue

export default {
  setup() {
    const mobileMenuOpen = ref(false)
    const cartVisible     = ref(false)
    const router          = useRouter()

    function toggleMobileMenu() {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }
    function closeMobileMenu() {
      mobileMenuOpen.value = false
    }
    function logout() {
      setUser(null)
      router.push({ name: 'Home' })
    }
    function toggleCart() {
      cartVisible.value = !cartVisible.value
    }
    // Pas besoin de wrapper removeFromCart : on l'importe déjà pour bouton corbeille
    function checkout() {
      // On retire du catalogue tous les articles achetés
      cartItems.value.forEach(item => removeProduct(item.id))
      // On vide le panier
      clearCart()
      // Ferme le tiroir et retourne à l'accueil
      cartVisible.value = false
      router.push({ name: 'Home' })
    }

    return {
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      logout,

      isAuthenticated,
      user: currentUser,

      cartVisible,
      toggleCart,
      cartItems,
      cartTotal,
      removeFromCart,
      checkout
    }
  }
}
</script>


<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing);
}
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-size: 1.5rem;
  margin: var(--spacing) 0;
}

/* Hamburger */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
}
.nav-toggle span {
  width: 25px;
  height: 3px;
  background: var(--color-text);
  transition: transform var(--transition), opacity var(--transition);
}
.nav-toggle span.open:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.nav-toggle span.open:nth-child(2) { opacity: 0; }
.nav-toggle span.open:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

/* Navigation */
.main-nav {
  display: flex;
  gap: var(--spacing);
  align-items: center;
}
.main-nav.open {
  /* mobile view */
}
.main-nav a,
.main-nav button {
  color: var(--color-text);
  font-weight: 500;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--transition-fast);
}
.main-nav a:hover,
.main-nav button:hover {
  color: var(--color-primary);
}

/* Boutons spéciaux */
.main-nav .btn-link {
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius);
  padding: 0.4rem 0.8rem;
}
.main-nav .btn-link:hover {
  background: var(--color-secondary);
}

/* Greeting */
.nav-greet {
  margin: 0 1rem;
  font-weight: 500;
}

/* Cart Icon */
.cart-btn {
  position: relative;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 0 0.5rem;
}
.badge {
  position: absolute;
  top: -6px; right: -8px;
  background: #e53935;
  color: #fff;
  border-radius: 50%;
  padding: 0 6px;
  font-size: 0.75rem;
}

/* Drawer Backdrop */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 999;
}

/* Drawer Panier */
.cart-drawer {
  position: fixed;
  top: 0; right: -360px;
  width: 360px; height: 100%;
  background: var(--color-surface);
  box-shadow: -4px 0 16px rgba(0,0,0,0.2);
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}
.cart-drawer.open {
  right: 0;
}
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing);
  background: var(--color-primary);
  color: #fff;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
}
.empty-drawer {
  padding: var(--spacing);
  text-align: center;
  color: var(--color-text-light);
}
.drawer-list {
  flex: 1;
  overflow-y: auto;
  margin: 0;
  padding: 0 var(--spacing);
  list-style: none;
}
.drawer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-half) 0;
  border-bottom: 1px solid #e0e0e0;
}
.item-info strong {
  display: block;
}
.item-info small {
  color: var(--color-text-light);
  font-size: 0.85rem;
}
.drawer-footer {
  padding: var(--spacing);
  border-top: 1px solid #e0e0e0;
  text-align: right;
}
.total {
  margin-bottom: var(--spacing-half);
  font-weight: 600;
  font-size: 1.1rem;
}
.btn.checkout {
  width: 100%;
  background: var(--color-secondary);
}
.btn.checkout:hover {
  background: var(--color-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-toggle { display: flex; }
  .main-nav {
    position: absolute;
    top: 100%;
    left: 0; right: 0;
    background: var(--color-surface);
    flex-direction: column;
    padding: var(--spacing);
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition);
  }
  .main-nav.open {
    max-height: 400px;
    box-shadow: var(--shadow-heavy);
  }
}

.site-footer {
  background: var(--color-surface);
  text-align: center;
  padding: var(--spacing);
  box-shadow: var(--shadow-light);
  margin-top: var(--spacing);
}
.team-names {
  margin-top: 0.5rem;
  font-style: italic;
}
</style>
