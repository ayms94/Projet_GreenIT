<template>
    <section class="form-container container">
      <h2>{{ isEdit ? 'Modifier l’annonce' : 'Nouvelle annonce' }}</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="name">Nom</label>
          <input id="name" v-model="form.name" required />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="form.description" rows="3"></textarea>
        </div>
  
        <div class="form-group">
          <label for="price">Prix (€)</label>
          <input
            id="price"
            v-model.number="form.price"
            type="number"
            step="0.01"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="category">Catégorie</label>
          <select id="category" v-model="form.category" required>
            <option disabled value="">-- Choisir --</option>
            <option v-for="o in options" :key="o.label" :value="o.label">
              {{ o.label }}
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="carbon">CO₂e estimé (kg)</label>
          <input id="carbon" :value="form.carbon_footprint" readonly />
        </div>
  
        <div class="form-actions">
          <button class="btn" type="submit">
            {{ isEdit ? 'Enregistrer' : 'Créer' }}
          </button>
          <button class="btn secondary" type="button" @click="cancel">
            Annuler
          </button>
        </div>
      </form>
    </section>
  </template>
  
  <script setup>
  import { reactive, toRefs, watch, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { products, saveProduct } from '../stores/products'
  import { currentUser } from '../stores/user'
  
  const route = useRoute()
  const router = useRouter()
  const id = route.params.id ? Number(route.params.id) : null
  
  // Catégories avec empreinte prédéfinie
  const options = [
    { label: 'Smartphone', footprint: 50 },
    { label: 'Ordinateur portable', footprint: 150 },
    { label: 'Vélo', footprint: 20 },
    { label: 'Meuble', footprint: 100 },
    { label: 'Livre', footprint: 5 }
  ]
  
  // État du form
  const form = reactive({
    id,
    name: '',
    description: '',
    price: 0,
    category: '',
    carbon_footprint: 0,
    seller_id: currentUser.value.id
  })
  
  // Si on édite, pré-remplir
  onMounted(() => {
    if (id !== null) {
      const p = products.value.find(x => x.id === id)
      if (p) Object.assign(form, p)
    }
  })
  
  // Met à jour l'empreinte au changement de catégorie
  watch(() => form.category, (cat) => {
    const o = options.find(x => x.label === cat)
    form.carbon_footprint = o ? o.footprint : 0
  })
  
  const isEdit = computed(() => id !== null)
  
  // Submit & retour à la liste
  function onSubmit() {
    saveProduct({ ...form })
    router.push({ name: 'Products' })
  }
  function cancel() {
    router.back()
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  .form-group {
    margin-bottom: var(--spacing);
  }
  .form-actions {
    display: flex;
    gap: var(--spacing);
    justify-content: flex-end;
    margin-top: var(--spacing);
  }
  .btn.secondary {
    background: var(--color-secondary);
    color: #fff;
  }
  .btn.secondary:hover {
    background: var(--color-primary);
  }
  </style>
  