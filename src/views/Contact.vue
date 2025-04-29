<!-- src/views/Contact.vue -->
<template>
    <section class="form-container">
      <h2>Contactez-nous</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="name">Votre nom</label>
          <input id="name" v-model="name" required/>
        </div>
        <div class="form-group">
          <label for="email">Votre email</label>
          <input id="email" type="email" v-model="email" required/>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="message" rows="5" required/>
        </div>
        <button class="btn" :disabled="sent">
          {{ sent ? 'Envoyé !' : 'Envoyer' }}
        </button>
      </form>
      <p v-if="ack" class="ack">Merci, nous vous répondrons sous 24 h.</p>
    </section>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup() {
      const name = ref('')
      const email = ref('')
      const message = ref('')
      const sent = ref(false)
      const ack = ref(false)
  
      function onSubmit() {
        // Ici tu pourrais envoyer à un service extern e.g. emailJS
        sent.value = true
        setTimeout(() => ack.value = true, 500)
      }
  
      return { name, email, message, sent, ack, onSubmit }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 480px;
    margin: 3rem auto;
    background: var(--color-surface);
    padding: var(--spacing);
    border-radius: var(--radius);
    box-shadow: var(--shadow-light);
  }
  .form-group {
    margin-bottom: var(--spacing);
  }
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: var(--radius);
  }
  .btn {
    display: block;
    width: 100%;
    padding: 0.75rem;
    background: var(--color-primary);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
  }
  .ack {
    margin-top: var(--spacing);
    color: var(--color-primary);
    text-align: center;
  }
  </style>
  