// src/stores/user.js
import { ref, computed } from 'vue'

// Si on a un user dans le localStorage, on le parse, sinon on crée un utilisateur « invité »
const stored = localStorage.getItem('user')
export const currentUser = ref(
  stored
    ? JSON.parse(stored)
    : { id: null, name: 'Invité', email: '' }
)

// On est authentifié uniquement si currentUser.id existe
export const isAuthenticated = computed(() => currentUser.value.id !== null)

/**
 * Met à jour l'utilisateur dans le store et dans localStorage.
 * Si `user` est `null`, on repasse en mode Invité.
 * @param {{id:number,name:string,email:string}|null} user
 */
export function setUser(user) {
  if (user) {
    currentUser.value = user
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    currentUser.value = { id: null, name: 'Invité', email: '' }
    localStorage.removeItem('user')
  }
}
