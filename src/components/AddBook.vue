<template>
  <form class="w-full max-w-md mx-auto mt-8" @submit.prevent="submitForm">
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="title">
        Название книги
      </label>
      <input
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title" type="text" placeholder="Введите название книги" required />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="author">
        Автор книги
      </label>
      <input
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="author" type="text" v-model="book.author" placeholder="Введите имя автора" required />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="description">
        Описание книги
      </label>
      <textarea
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="description" v-model="book.description" placeholder="Введите описание книги" required></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="image">
        Фото книги
      </label>
      <input
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="image" type="file" @change="handleImageUpload" accept="image/*" />
    </div>
    <div class="flex items-center justify-between">
      <input type="submit" value="Добавить книгу"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  </form>
  <div v-for="(book, index) in books" :key="index" class="bg-gray-100 p-4 rounded-lg mt-4">
    <h3 class="font-bold text-lg">{{ book.title }}</h3>
    <p class="text-gray-700 italic">{{ book.author }}</p>
    <p class="text-gray-700 mt-2">{{ book.description }}</p>
    <img v-if="book.image" :src="book.image ? url.createObjectURL(book.image) : ''" class="mt-2 max-h-64" />
  </div>
</template>



<script lang="ts">
// Импортируем необходимые модули из библиотеки Vue и Socket.io
import { defineComponent, onMounted, ref,reactive,computed } from 'vue';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';


// Создаем пустой файл и получаем URL для него
const file = new File([], 'dummy');
const url: any = URL.createObjectURL(file);

// Устанавливаем соединение с сервером Socket.io
const socket: Socket = io();



// Определяем интерфейс книги
interface Book {
  title: string;
  author: string;
  description: string;
  image?: File;
}

// Экспортируем компонент Vue
export default defineComponent({
  setup() {
    // Создаем реактивную переменную для отслеживания состояния формы
    const book = ref<Book>({
      title: '',
      author: '',
      description: '',
    });

    // Получаем массив книг из локального хранилища
    const books = ref<Book[]>(JSON.parse(localStorage.getItem('books') || '[]'));
    const addBook = (book: Book) => {
      books.value.push(book);
      localStorage.setItem('books', JSON.stringify(books.value));
    };
    // Определяем функцию для отправки данных формы на сервер
    const submitForm = async () => {
      try {
        const formData = new FormData();
        formData.append('title', book.value.title);
        formData.append('author', book.value.author);
        formData.append('description', book.value.description);
        if (book.value.image) {
          formData.append('image', book.value.image);
        }

        // Отправляем данные на сервер и эмитируем событие с полученными данными
        const response = await axios.post('../server/server.ts', formData);
        socket.emit('book-added', response.data);

        // Добавляем книгу в массив и сбрасываем состояние формы
        addBook(response.data);
        book.value = {
          title: '',
          author: '',
          description: '',
        };
      } catch (error) {
        console.error(error + ' Ошибка при отправке данных на сервер');

      }
    };
         

    // Обрабатываем загрузку изображения
    const handleImageUpload = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file: File | null = target.files?.[0] || null;
      if (file) {
        book.value.image = file;
      } else {
        book.value.image = undefined;
      }
    };


    // Получаем массив книг из локального хранилища при загрузке страницы
    onMounted(() => {
      books.value = JSON.parse(localStorage.getItem('books') || '[]');
    });

    // Возвращаем объект с переменными и функциями, доступными в шаблоне
    return {
      book,
      url,
      books,
      submitForm,
      handleImageUpload,
    };
  },

});
</script>