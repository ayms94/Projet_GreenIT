<!-- src/views/Catalogue.vue -->
<template>
    <section class="catalogue-page container">
      <header class="catalogue-header">
        <h2>Catalogue général</h2>
      </header>
  
      <!-- Filtres -->
      <div class="catalogue-filters">
        <select v-model="filters.category">
          <option value="">Toutes catégories</option>
          <option v-for="c in categories" :key="c">{{ c }}</option>
        </select>
        <input
          v-model.number="filters.minPrice"
          type="number"
          placeholder="Prix min"
        />
        <input
          v-model.number="filters.maxPrice"
          type="number"
          placeholder="Prix max"
        />
        <label><input type="checkbox" v-model="filters.local" /> Locale</label>
        <label><input type="checkbox" v-model="filters.bio" /> Bio</label>
        <button class="btn small" @click="resetFilters">Réinitialiser</button>
      </div>
  
      <p v-if="filtered.length === 0" class="empty">
        Aucune annonce ne correspond.
      </p>
  
      <div v-else class="products-grid">
        <div v-for="p in filtered" :key="p.id" class="product-card">
          <h4>{{ p.name }}</h4>
          <p class="price">{{ p.price.toFixed(2) }} €</p>
          <p class="category">{{ p.category }}</p>
          <p class="carbon">{{ p.carbon }} kg CO₂e</p>
          <div class="tags">
            <span v-if="p.isLocal">🌍 Locale</span>
            <span v-if="p.isBio">🍃 Bio</span>
          </div>
          <button class="add-cart-btn" @click="add(p)">
            🛒 Ajouter au panier
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { products } from '../stores/products'
  import { addToCart } from '../stores/cart'
  
  const users = ref([])
  onMounted(async () => {
    try {
      const res = await fetch('/api/users')
      users.value = await res.json()
    } catch {
      users.value = []
    }
  })
  function getSellerName(id) {
    const u = users.value.find(u => u.id === id)
    return u ? u.name : 'Inconnu'
  }
  
  const filters = reactive({
    category: '',
    minPrice: null,
    maxPrice: null,
    local: false,
    bio: false
  })
  const categories = computed(() =>
    Array.from(new Set(products.value.map(p => p.category)))
  )
  const filtered = computed(() =>
    products.value
      .filter(p => (filters.category ? p.category === filters.category : true))
      .filter(p => (filters.minPrice != null ? p.price >= filters.minPrice : true))
      .filter(p => (filters.maxPrice != null ? p.price <= filters.maxPrice : true))
      .filter(p => (filters.local ? p.isLocal : true))
      .filter(p => (filters.bio ? p.isBio : true))
  )
  function resetFilters() {
    filters.category = ''
    filters.minPrice = null
    filters.maxPrice = null
    filters.local = false
    filters.bio = false
  }
  function add(p) {
    addToCart(p)
  }
  </script>
  
  <style scoped>
  .catalogue-filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing);
    margin-bottom: var(--spacing);
  }
  .catalogue-filters select,
  .catalogue-filters input {
    padding: 0.5rem;
    border-radius: var(--radius);
    border: 1px solid #ccc;
  }
  .catalogue-filters label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .empty {
    text-align: center;
    color: var(--color-text-light);
    margin-top: var(--spacing);
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--spacing);
  }
  .product-card {
    background: var(--color-surface);
    padding: var(--spacing);
    border-radius: var(--radius);
    box-shadow: var(--shadow-light);
    display: flex;
    flex-direction: column;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  }
  .product-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-heavy);
  }
  .product-card h4 {
    margin: 0 0 var(--spacing-half);
    font-size: 1.1rem;
  }
  .price {
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: var(--spacing-half);
  }
  .category,
  .carbon {
    font-size: 0.9rem;
    color: var(--color-text-light);
  }
  .tags {
    margin-bottom: var(--spacing-half);
  }
  .tags span {
    margin-right: 0.5rem;
    background: var(--color-bg);
    padding: 0.2rem 0.4rem;
    border-radius: var(--radius);
    font-size: 0.8rem;
  }
  
  /* Bouton "Ajouter au panier" */
  .add-cart-btn {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.4rem;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: var(--radius);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    cursor: pointer;
    transition:
      background var(--transition-fast),
      transform var(--transition-fast),
      box-shadow var(--transition-fast);
  }
  .add-cart-btn:hover {
    background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
  
  /* Petit bouton de réinitialisation */
  .btn.small {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
  
  /* Form & Footer inherited styles... */
  </style>
  