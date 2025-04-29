<!-- src/views/Stats.vue -->
<template>
    <section class="stats-page container">
      <h2>Statistiques Éco-Empreinte</h2>
  
      <div class="stats-grid">
        <div class="card">
          <h3>Total produits</h3>
          <p>{{ totalProducts }}</p>
        </div>
        <div class="card">
          <h3>Empreinte totale</h3>
          <p>{{ totalCarbon.toFixed(1) }} kg CO₂e</p>
        </div>
        <div class="card">
          <h3>Empreinte moyenne</h3>
          <p>{{ avgCarbon.toFixed(1) }} kg CO₂e</p>
        </div>
      </div>
  
      <h3>Répartition par catégorie</h3>
      <ul class="category-list">
        <li v-for="(count, category) in categoryCounts" :key="category">
          {{ category }} : {{ count }} produit{{ count > 1 ? 's' : '' }}
        </li>
      </ul>
    </section>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { products } from '../stores/products'
  import { currentUser } from '../stores/user'
  
  // Sélectionne uniquement les produits du user connecté
  const userProducts = computed(() =>
    products.value.filter(p => p.seller_id === currentUser.value.id)
  )
  
  const totalProducts  = computed(() => userProducts.value.length)
  const totalCarbon    = computed(() =>
    userProducts.value.reduce((sum, p) => sum + (p.carbon || 0), 0)
  )
  const avgCarbon      = computed(() =>
    userProducts.value.length ? totalCarbon.value / userProducts.value.length : 0
  )
  const categoryCounts = computed(() =>
    userProducts.value.reduce((map, p) => {
      const cat = p.category || 'Non spécifié'
      map[cat] = (map[cat] || 0) + 1
      return map
    }, {})
  )
  </script>
  
  <style scoped>
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(180px,1fr));
    gap: var(--spacing);
    margin-bottom: var(--spacing);
  }
  .card {
    background: var(--color-surface);
    padding: var(--spacing);
    border-radius: var(--radius);
    box-shadow: var(--shadow-light);
    text-align: center;
  }
  .category-list {
    list-style: none;
    padding: 0;
  }
  .category-list li {
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }
  </style>
  