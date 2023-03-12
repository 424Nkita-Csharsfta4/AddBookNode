<template>
    <div class="bg-white rounded-md shadow-md">
        <div class="px-4 py-2 mt-2">
            <h2 class="text-lg font-medium text-gray-600">{{ form.title }}</h2>
            <p class="text-gray-600">{{ form.description }}</p>
        </div>
        <div v-if="showForm">
            <EventForm v-model:title="form.title" v-model:description="form.description"
                @add-event="$emit('add-event', $event)" />
        </div>
        <div class="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-b-md">
            <button class="text-blue-600 hover:text-blue-800" @click="editEvent">Edit</button>
            <button class="text-red-600 hover:text-red-800" @click="$emit('delete', form)">Delete</button>
            <button class="text-green-600 hover:text-green-800" @click="showForm = true">Add Event</button>
        </div>
    </div>
</template>
<script lang="ts">
import EventForm from './EventForm.vue';

interface EventForm {
    title: string;
    description: string;
}

export default {
    name: 'EventCard',

    components: {
        EventForm,
    },

    props: {
        event: {
            type: Object,
            required: true
        },
        loadedEvent: {
            type: Object,
            default: () => ({})
        }
    },

    created() {
        // You can replace the axios GET request with your own method
        this.fetchEventData();
    },

    data() {
        return {
            form: {} as EventForm,
            showForm: false,
        };
    },

    methods: {
        fetchEventData() {
            // This is an example of how you can fetch event data
            this.form = {
                title: this.event.title,
                description: this.event.description
            };
        },
        editEvent() {
            this.showForm = true;
        },
        addEvent(event: EventForm) {
            // This is an example of how you can add event data
            this.$emit('add-event', event);
            this.showForm = false;
        },
    }
}
</script>