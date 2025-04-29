import { ref, watch } from 'vue'

// Charge depuis localStorage ou initialise vide
const saved = localStorage.getItem('products')
export const products = ref(saved ? JSON.parse(saved) : [])

// Sauvegarde automatique à chaque changement
watch(
  products,
  (val) => localStorage.setItem('products', JSON.stringify(val)),
  { deep: true }
)

export function saveProduct(prod) {
  if (prod.id == null) {
    prod.id = Date.now()
    products.value.push(prod)
  } else {
    const idx = products.value.findIndex((p) => p.id === prod.id)
    if (idx >= 0) products.value.splice(idx, 1, prod)
  }
}

export function removeProduct(id) {
  products.value = products.value.filter((p) => p.id !== id)
}
