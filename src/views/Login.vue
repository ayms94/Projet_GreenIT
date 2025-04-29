<template>
    <section class="form-container">
      <h2 class="form-title">Se connecter</h2>
      <form @submit.prevent="onLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="exemple@mail.com"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'Connexion…' : 'Se connecter' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </section>
  </template>
  
  <script>
  import { setUser } from '../stores/user'
  
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        error: '',
        loading: false
      }
    },
    methods: {
      async onLogin() {
        this.error = ''
        this.loading = true
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.email, password: this.password })
          })
          const data = await res.json()
          if (!res.ok) throw data
          // Mise à jour du store utilisateur
          setUser(data)
          // → Redirection vers la page d'accueil
          this.$router.push({ name: 'Home' })
        } catch (e) {
          this.error = e.error || 'Identifiants incorrects'
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 360px;
    margin: 4rem auto;
    background: var(--color-surface);
    padding: var(--spacing);
    border-radius: var(--radius);
    box-shadow: var(--shadow-heavy);
  }
  .form-title {
    text-align: center;
    margin-bottom: var(--spacing);
    font-size: 1.5rem;
    color: var(--color-primary);
  }
  .form-group {
    margin-bottom: var(--spacing);
  }
  .form-group label {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--color-text);
  }
  .form-group input {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: var(--radius);
  }
  .btn {
    width: 100%;
    padding: 0.75rem;
    background: var(--color-primary);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
  }
  .btn:disabled {
    background: var(--color-text-light);
    cursor: not-allowed;
  }
  .error {
    margin-top: var(--spacing);
    color: #e53935;
    text-align: center;
  }
  </style>
  