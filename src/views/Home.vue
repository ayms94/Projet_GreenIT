<!-- src/views/Home.vue -->
<template>
    <div class="home">
  
      <!-- Hero Section -->
      <section class="home-hero">
        <div class="hero-content">
          <h1>Green Marketplace 🌱</h1>
          <p>
            Achetez et vendez des objets reconditionnés pour réduire votre
            empreinte carbone tout en faisant des économies.
          </p>
          <router-link class="btn hero-btn" to="/products">
            Voir les produits →
          </router-link>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="home-features">
        <div class="feature-card">
          <span class="feature-icon">🔄</span>
          <h3>Reconditionné</h3>
          <p>Économisez et prolongez la vie des objets.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🌍</span>
          <h3>Éco-responsable</h3>
          <p>Réduisez vos émissions de CO₂.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">💰</span>
          <h3>Économique</h3>
          <p>Jusqu’à 70 % moins cher que du neuf.</p>
        </div>
      </section>
  
      <!-- Quick Stats Section -->
      <section class="home-stats">
        <div class="stat-item">
          <h2>{{ countProducts }}</h2>
          <p>Produits</p>
        </div>
        <div class="stat-item">
          <h2>{{ totalSaved.toFixed(1) }} kg</h2>
          <p>CO₂e évités</p>
        </div>
        <div class="stat-item">
          <h2>{{ uniqueSellers }}</h2>
          <p>Vendeurs</p>
        </div>
      </section>
  
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { products } from '../stores/products'
  
  // Nombre total de produits
  const countProducts = computed(() => products.value.length)
  
  // Somme des émissions évitées (utilise la propriété `carbon` du store)
  const totalSaved = computed(() =>
    products.value.reduce((sum, p) => sum + (p.carbon || 0), 0)
  )
  
  // Nombre de vendeurs distincts
  const uniqueSellers = computed(() => {
    const ids = products.value.map(p => p.seller_id)
    return new Set(ids).size
  })
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
    padding: var(--spacing);
  }
  
  /* Hero */
  .home-hero {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: #fff;
    padding: 3rem var(--spacing);
    border-radius: var(--radius);
    text-align: center;
  }
  .hero-content {
    max-width: 600px;
    margin: 0 auto;
  }
  .hero-content h1 {
    font-size: 2.5rem;
    margin-bottom: var(--spacing);
  }
  .hero-content p {
    font-size: 1.1rem;
    margin-bottom: var(--spacing);
  }
  
  /* Improved button */
  .hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.6rem;
    background: #fff;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1rem;
    border-radius: var(--radius);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: background var(--transition-fast), transform var(--transition-fast);
  }
  .hero-btn:hover {
    background: var(--color-surface);
    transform: translateY(-2px);
  }
  
  /* Features */
  .home-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing);
  }
  .feature-card {
    background: var(--color-surface);
    padding: var(--spacing);
    border-radius: var(--radius);
    box-shadow: var(--shadow-light);
    text-align: center;
    transition: transform var(--transition-fast);
  }
  .feature-card:hover {
    transform: translateY(-4px);
  }
  .feature-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  /* Stats */
  .home-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing);
  }
  .stat-item {
    background: var(--color-surface);
    padding: var(--spacing);
    border-radius: var(--radius);
    box-shadow: var(--shadow-light);
    text-align: center;
    min-width: 120px;
  }
  .stat-item h2 {
    font-size: 1.8rem;
    margin-bottom: 0.25rem;
  }
  .stat-item p {
    color: var(--color-text-light);
  }
  </style>
  