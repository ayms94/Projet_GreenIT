<template>
    <section class="form-container">
      <h2 class="form-title">Inscription</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="name">Nom</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Jean Dupont"
            required
          />
        </div>
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
          {{ loading ? 'Inscription...' : 'S’inscrire' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </section>
  </template>
  
  <script>
  export default {
    name: 'Signup',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false
      }
    },
    methods: {
      async onSubmit() {
        this.error = ''
        this.loading = true
        try {
          const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              password: this.password
            })
          })
          const data = await res.json()
          if (!res.ok) throw data
          this.$router.push({ name: 'Login' })
        } catch (e) {
          this.error = e.error || 'Erreur lors de l’inscription'
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
    text-align: center;
  }
  
  .form-title {
    margin-bottom: var(--spacing);
    font-size: 1.5rem;
    color: var(--color-primary);
  }
  
  .form-group {
    margin-bottom: var(--spacing);
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 600;
    color: var(--color-text);
  }
  
  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: var(--radius);
    transition: border var(--transition-fast);
  }
  
  .form-group input:focus {
    outline: none;
    border-color: var(--color-primary);
  }
  
  .btn {
    width: 100%;
    padding: 0.75rem;
    background: var(--color-primary);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    transition: background var(--transition-fast), transform var(--transition-fast);
  }
  
  .btn:hover:not(:disabled) {
    background: var(--color-secondary);
    transform: translateY(-2px);
  }
  
  .btn:disabled {
    background: var(--color-text-light);
    cursor: not-allowed;
  }
  
  .error {
    margin-top: var(--spacing);
    color: #e53935;
    font-size: 0.9rem;
  }
  </style>
  