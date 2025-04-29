<template>
    <section class="detail-page container">
      <button class="btn-link back" @click="$router.back()">← Retour</button>
      <div class="detail-card">
        <img
          src="https://via.placeholder.com/400x300?text=Image"
          alt="Photo produit"
          class="detail-image"
        />
        <div class="detail-info">
          <h2>{{ product.name }}</h2>
          <p class="price">{{ product.price.toFixed(2) }} €</p>
          <p class="category">Catégorie: {{ product.category }}</p>
          <p class="carbon">
            Empreinte carbone: {{ product.carbon_footprint }} kg CO₂e
          </p>
          <p class="desc">{{ product.description }}</p>
          <button class="btn contact">Contacter le vendeur</button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { products } from '../stores/products'
  
  const route = useRoute()
  const id = Number(route.params.id)
  const product = ref({})
  
  onMounted(() => {
    const p = products.value.find(x => x.id === id)
    if (p) product.value = p
  })
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  .back {
    margin: var(--spacing) 0;
  }
  .detail-card {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing);
    background: var(--color-surface);
    box-shadow: var(--shadow-light);
    padding: var(--spacing);
    border-radius: var(--radius);
  }
  .detail-image {
    max-width: 400px;
    border-radius: var(--radius);
  }
  .detail-info {
    flex: 1;
  }
  .price {
    font-size: 1.5rem;
    font-weight: bold;
    margin: var(--spacing) 0;
  }
  .contact {
    margin-top: var(--spacing);
    background: var(--color-secondary);
    color: #fff;
    width: 100%;
    padding: var(--spacing);
  }
  </style>
  