<template>
    <section class="container">
      <h2>Bonjour, {{ displayName }} 👋</h2>
      <nav class="products-header">
        <router-link class="btn" to="/products">Mes produits</router-link>
        <router-link class="btn" to="/messages">Messagerie</router-link>
        <router-link class="btn" to="/stats">Stats carbone</router-link>
      </nav>
    </section>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
    computed: {
      displayName() {
        const u = JSON.parse(localStorage.getItem('user') || '{}')
        return u.name || 'Invité'
      }
    }
  }
  </script>
  