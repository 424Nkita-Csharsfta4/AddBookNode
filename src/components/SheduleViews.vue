<template>
    <div class="min-h-screen bg-gray-100">
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <h1 class="text-2xl font-semibold">Scheduler</h1>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                    <EventCard v-for="(event, index) in events"
                     :key="index"
                     :event="event"
                     @edit="editEvent"
                     @delete="deleteEvent" />
                </div>
                <div class="mt-6">
                    <EventForm @submit="addEvent" 
                    :title="eventTitle"
                     :description="eventDescription" />
                </div>
            </div>
        </main>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import EventCard from './EventCard.vue';
import EventForm from './EventForm.vue';
import io from 'socket.io-client';

/**Это создает подключение WebSocket к серверу с использованием Socket.IO */
const socket = io('http://localhost:5173');

export default defineComponent({
    name: 'App',
    components: {
        EventCard,
        EventForm
    },
    /**Это перехватчик жизненного цикла, который вызывается при создании компонента. */
    created() {
        socket.on('new-event', (event: any) => {
            this.addEvent(event);
        });
    },
    data() {
        return {
            /**Это инициализирует пустой массив для хранения событий, полученных с сервера. */
            events: [] as any[],
            event: { name: "", date: "" },
            loadedEvent: true,
            eventTitle: '',
            eventDescription: ''
        };
    },
    methods: {
        /**Это метод, который добавляет новое событие в массив 'events' при получении нового события с сервера. */
        addEvent(newEvent: any) {
            this.events.push(newEvent);
        },
           /**Это метод, который редактирует новое событие в массив 'events' при получении нового события с сервера. */
        editEvent(updatedEvent: any) {
            const index = this.events.findIndex(event => event.id === updatedEvent.id);
            this.events.splice(index, 1, updatedEvent);
        },
           /**Это метод, который удаляет новое событие в массив 'events' при получении нового события с сервера. */
        deleteEvent(deletedEvent: any) {
            const index = this.events.findIndex(event => event.id === deletedEvent.id);
            this.events.splice(index, 1);
        }
    }
});
</script>