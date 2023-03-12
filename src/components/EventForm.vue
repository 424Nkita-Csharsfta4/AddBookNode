<template>
    <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-gray-700 font-medium mb-2">Title</label>
                <input
                    class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    type="text" v-model="form.title" />
            </div>
            <div>
                <label class="block text-gray-700 font-medium mb-2">Date</label>
                <input
                    class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    type="datetime-local" v-model="form.date" />
            </div>
            <div>
                <label class="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                    class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    rows="4" v-model="form.description"></textarea>
            </div>
            <div class="col-span-2">
                <div class="flex justify-end">
                    <button
                        class="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                        type="submit">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
interface EventForm {
    title: string;
    date: string;
    description: string;
}

export default defineComponent({
    name: 'EventForm',


    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },

    data(): { form: EventForm } {
        return {
            form: {
                title: this.title,
                date: '',
                description: this.description,
            },
        };
    },

    methods: {
        handleSubmit(): void {
            console.log('Form submitted with data: ', this.form);
            this.$emit('add-event', this.form);
            this.form.title = '';
            this.form.date = '';
            this.form.description = '';
        },
    },
});
</script>