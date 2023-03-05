<template>
  <div class="container mx-auto mt-4">
    <h1 class="text-2xl font-bold mb-4">Онлайн-учебник Чат</h1>

    <div class="border rounded-lg p-4 mb-4">
      <div v-for="message in messages" :key="message.id">
        <span class="font-bold">{{ message.username }}:</span>
        <span>{{ message.text }}</span>
      </div>
    </div>

    <div class="flex">
      <input class="flex-1 border rounded-lg p-2 mr-2" type="text" placeholder="Введите ваше сообщение..."
        v-model="newMessage" />
      <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" @click="sendMessage">
        Отправить
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import WebSocket from 'ws';
import { defineComponent } from 'vue';

interface Message {
  id: number;
  username: string;
  text: string;
}

export default defineComponent({
  name: 'Chat',
  data() {
    return {
      messages: [] as Message[],
      newMessage: '',
      ws: null as WebSocket | null,
    };
  },
  created() {
    this.connectWebSocket();
    this.fetchMessages();
  },
  methods: {
    connectWebSocket() {
  if (typeof window !== 'undefined' && window.WebSocket) {
  } else if (typeof WebSocket !== 'undefined') {
    this.ws = new WebSocket('ws://localhost:5173');
  } else {
    throw new Error('WebSocket is not supported');
  }
},




    async fetchMessages() {
      const response = await axios.get<Message[]>('../api/messages');
      this.messages = response.data;
    },
    async sendMessage() {
      const username = 'Anonymous'; // Здесь можно добавить форму для ввода имени пользователя
      const message: Message = {
        id: Date.now(),
        username,
        text: this.newMessage,
      };
      await axios.post('../api/messages', message);
      this.newMessage = '';
    },
  },
});
</script>