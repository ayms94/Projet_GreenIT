<template>
    <section class="products-page container">
      <header class="products-header">
        <h2>Mes produits</h2>
        <button class="btn add-btn" @click="openForm()">
          {{ editingIndex >= 0 ? '✏️ Modifier' : '➕ Ajouter' }}
        </button>
      </header>
  
      <!-- Formulaire inline -->
      <div v-if="formVisible" class="form-container">
        <h3>{{ editingIndex >= 0 ? 'Modifier un produit' : 'Ajouter un produit' }}</h3>
  
        <div class="form-group">
          <label>Nom</label>
          <input v-model="form.name" type="text" placeholder="Nom du produit" />
        </div>
  
        <div class="form-group">
          <label>Prix (€)</label>
          <input
            v-model.number="form.price"
            type="number"
            step="0.01"
            placeholder="0.00"
          />
        </div>
  
        <div class="form-group">
          <label>Catégorie</label>
          <select v-model="form.category">
            <option disabled value="">-- Sélectionnez --</option>
            <option v-for="c in categories" :key="c">{{ c }}</option>
          </select>
        </div>
  
        <div class="form-group">
          <label>CO₂e (kg)</label>
          <input v-model.number="form.carbon" type="number" readonly />
        </div>
  
        <div class="form-actions">
          <button class="btn" @click="save()">Enregistrer</button>
          <button class="btn secondary" @click="closeForm()">Annuler</button>
        </div>
      </div>
  
      <!-- Catalogue utilisateur -->
      <p v-if="userProducts.length === 0" class="empty">
        Aucun produit pour le moment.
      </p>
      <div v-else class="products-grid">
        <div
          v-for="(p, i) in userProducts"
          :key="p.id"
          class="product-card"
        >
          <div class="card-header">
            <h4>{{ p.name }}</h4>
            <span class="tag">{{ p.category }}</span>
          </div>
          <div class="card-body">
            <p class="price">{{ p.price.toFixed(2) }} €</p>
            <p class="carbon">{{ p.carbon }} kg CO₂e</p>
          </div>
          <div class="actions">
            <button class="btn small edit" @click="edit(i)">✏️</button>
            <button class="btn small danger" @click="remove(p.id)">🗑️</button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, reactive, watch, computed } from 'vue'
  import { products, saveProduct, removeProduct } from '../stores/products'
  import { currentUser } from '../stores/user'
  
  // Catégories et empreintes prédéfinies
  const categoryMap = {
    Smartphone: 50,
    'Ordinateur portable': 150,
    Vélo: 20,
    Meuble: 100,
    Livre: 5,
    Autre: 10
  }
  const categories = Object.keys(categoryMap)
  
  // Formulaire et état
  const formVisible = ref(false)
  const editingIndex = ref(-1)
  const form = reactive({
    id: null,
    name: '',
    price: 0,
    category: '',
    carbon: 0,
    seller_id: currentUser.value.id
  })
  
  // Met à jour l’empreinte quand on change la catégorie
  watch(() => form.category, cat => {
    form.carbon = categoryMap[cat] || 0
  })
  
  // Ouvre / ferme le formulaire
  function openForm() {
    if (editingIndex.value < 0) {
      Object.assign(form, {
        id: null,
        name: '',
        price: 0,
        category: '',
        carbon: 0,
        seller_id: currentUser.value.id
      })
    }
    formVisible.value = true
  }
  function closeForm() {
    formVisible.value = false
    editingIndex.value = -1
  }
  
  // Sauvegarde / Édition / Suppression
  function save() {
    if (!form.name.trim()) return alert('Le nom est requis')
    saveProduct({ ...form })
    closeForm()
  }
  function edit(idx) {
    const p = products.value.filter(p => p.seller_id === currentUser.value.id)[idx]
    Object.assign(form, p)
    editingIndex.value = idx
    formVisible.value = true
  }
  function remove(id) {
    if (confirm('Supprimer ce produit ?')) {
      removeProduct(id)
    }
  }
  
  // Produits filtrés pour l’utilisateur
  const userProducts = computed(() =>
    products.value.filter(p => p.seller_id === currentUser.value.id)
  )
  </script>
  
  <style scoped>
  .products-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing);
  }
  
  .add-btn {
    background: var(--color-secondary);
  }
  .add-btn:hover {
    background: var(--color-primary);
  }
  
  /* Grille de cartes améliorée */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--spacing);
  }
  
  .product-card {
    background: var(--color-surface);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  }
  
  .card-header {
    padding: var(--spacing);
    background: var(--color-bg);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-header h4 {
    margin: 0;
    font-size: 1.1rem;
    color: var(--color-text);
  }
  .tag {
    background: var(--color-primary);
    color: #fff;
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: var(--radius);
  }
  
  .card-body {
    padding: 0 var(--spacing) var(--spacing) var(--spacing);
    flex: 1;
  }
  .price {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--color-primary);
    margin: 0 0 var(--spacing-half) 0;
  }
  .carbon {
    font-size: 0.85rem;
    color: var(--color-text-light);
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing);
    background: var(--color-bg);
    border-top: 1px solid #eee;
  }
  .btn.small {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
  .btn.edit {
    background: #4caf50;
  }
  .btn.edit:hover {
    background: #43a047;
  }
  .btn.danger {
    background: #e53935;
  }
  .btn.danger:hover {
    background: #d32f2f;
  }
  
  /* Formulaire */
  .form-container {
    background: var(--color-surface);
    padding: var(--spacing);
    border-radius: var(--radius);
    box-shadow: var(--shadow-light);
    margin-bottom: var(--spacing);
  }
  .form-group {
    margin-bottom: var(--spacing);
  }
  .form-group label {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--color-text-light);
  }
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: var(--radius);
  }
  .form-actions {
    text-align: right;
  }
  .btn.secondary {
    background: var(--color-secondary);
  }
  .btn.secondary:hover {
    background: var(--color-primary);
  }
  
  /* Vide */
  .empty {
    text-align: center;
    color: var(--color-text-light);
    margin-top: var(--spacing);
  }
  </style>
  