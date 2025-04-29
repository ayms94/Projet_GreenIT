<template>
    <section class="messaging-page container">
      <aside class="conversations-list">
        <h3>Conversations</h3>
        <ul>
          <li
            v-for="c in conversations"
            :key="c.withUser.id"
            :class="{ active: c.withUser.id === activeUserId }"
            @click="selectConversation(c.withUser.id)"
          >
            <div class="conv-info">
              <p class="conv-name">{{ c.withUser.name }}</p>
              <p class="conv-preview">{{ c.preview }}</p>
            </div>
          </li>
        </ul>
      </aside>
  
      <div class="chat-window">
        <div v-if="activeUserId" class="chat-header">
          <h3>Conversation avec {{ getUserName(activeUserId) }}</h3>
        </div>
        <div v-else class="chat-placeholder">
          <p>Sélectionnez une conversation</p>
        </div>
  
        <div v-if="activeUserId" class="messages-container">
          <div
            v-for="m in activeMessages"
            :key="m.id"
            :class="[
              'message-item',
              m.sender_id === currentUser.id ? 'sent' : 'received'
            ]"
          >
            <p>{{ m.content }}</p>
            <small>{{ formatDate(m.sent_at) }}</small>
          </div>
        </div>
  
        <div v-if="activeUserId" class="chat-input">
          <textarea
            v-model="newMessage"
            placeholder="Écrire un message..."
            @keyup.enter.exact.prevent="sendMessage"
          ></textarea>
          <button class="btn" @click="sendMessage">Envoyer</button>
        </div>
  
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'Messages',
    data() {
      return {
        users: [],
        messages: [],
        conversations: [],
        activeUserId: null,
        newMessage: '',
        error: ''
      }
    },
    computed: {
      currentUser() {
        return JSON.parse(localStorage.getItem('user') || '{}')
      },
      activeMessages() {
        return this.messages
          .filter(
            m =>
              (m.sender_id === this.currentUser.id && m.receiver_id === this.activeUserId) ||
              (m.sender_id === this.activeUserId && m.receiver_id === this.currentUser.id)
          )
          .sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at))
      }
    },
    methods: {
      formatDate(dt) {
        return new Date(dt).toLocaleString()
      },
      getUserName(userId) {
        const u = this.users.find(u => u.id === userId)
        return u ? u.name : 'Utilisateur'
      },
      async loadData() {
        try {
          const [usersRes, msgsRes] = await Promise.all([
            fetch('/api/users'),
            fetch('/api/messages')
          ])
          this.users = await usersRes.json()
          this.messages = await msgsRes.json()
          this.buildConversations()
        } catch {
          this.error = 'Impossible de charger la messagerie'
        }
      },
      buildConversations() {
        const convMap = new Map()
        this.messages.forEach(m => {
          const peerId =
            m.sender_id === this.currentUser.id
              ? m.receiver_id
              : m.receiver_id === this.currentUser.id
              ? m.sender_id
              : null
          if (peerId) {
            if (!convMap.has(peerId)) convMap.set(peerId, [])
            convMap.get(peerId).push(m)
          }
        })
        this.conversations = Array.from(convMap.entries()).map(([withId, msgs]) => ({
          withUser: this.users.find(u => u.id === withId) || { id: withId, name: 'Inconnu' },
          preview:
            msgs[msgs.length - 1].content.slice(0, 30) +
            (msgs[msgs.length - 1].content.length > 30 ? '…' : '')
        }))
      },
      selectConversation(userId) {
        this.activeUserId = userId
      },
      async sendMessage() {
        if (!this.newMessage.trim()) return
        try {
          const res = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: this.newMessage,
              sender_id: this.currentUser.id,
              receiver_id: this.activeUserId
            })
          })
          const m = await res.json()
          if (!res.ok) throw m
          this.messages.push(m)
          this.newMessage = ''
          this.buildConversations()
        } catch {
          this.error = "Erreur lors de l'envoi"
        }
      }
    },
    created() {
      this.loadData()
    }
  }
  </script>
  