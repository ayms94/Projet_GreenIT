<template>
  <div class="card">
    <img
      v-if="product.imageUrl"
      :src="product.imageUrl"
      :alt="product.name"
      loading="lazy"
    />
    <div class="card-body">
      <h3 class="card-title">{{ product.name }}</h3>
      <p class="card-meta">{{ product.category || 'Non spécifié' }}</p>
      <p class="card-price">€{{ product.price.toFixed(2) }}</p>
      <p v-if="product.carbon_footprint !== null" class="card-carbon">
        CO₂ : {{ product.carbon_footprint.toFixed(2) }} kg
      </p>
      <div class="card-actions">
        <router-link
          :to="{ name: 'ProductEdit', params: { id: product.id } }"
          class="action edit"
          title="Modifier"
        >✏️</router-link>
        <button @click="$emit('delete', product.id)" class="action delete" title="Supprimer">
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, required: true }
  }
}
</script>

<style scoped>
.card {
  background: var(--color-surface);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-light);
  display: flex;
  flex-direction: column;
  transition: transform var(--transition), box-shadow var(--transition);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-heavy);
}
.card img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}
.card-body {
  padding: var(--spacing);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.card-title {
  margin: 0;
  font-size: 1.1rem;
}
.card-meta {
  font-size: 0.85rem;
  color: var(--color-text-light);
}
.card-price {
  font-weight: bold;
  color: var(--color-primary);
}
.card-carbon {
  font-size: 0.8rem;
  color: var(--color-secondary);
}
.card-actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.action {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color var(--transition-fast);
}
.action.edit:hover { color: var(--color-primary); }
.action.delete:hover { color: var(--color-secondary); }
</style>
