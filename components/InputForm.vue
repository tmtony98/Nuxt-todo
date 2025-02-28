<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import Listview from '~/components/Listview.vue'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'

definePageMeta({
  layout: 'custom'
})

const inputText = ref('')




const addItem = async () => {
  const response = await useFetch('http://localhost:5000/todo', {
    method: 'POST',
    body: { todo: inputText.value }
  })
  const error = response.error
  if (error.value) {
    console.error('Error adding todo:', error.value)
  } else {
    useToastify("Todo Added successfully !", {
    autoClose: 1500,
    position: ToastifyOption.POSITION.TOP_RIGHT,
  });
    inputText.value = ""

  }
}






useSeoMeta({
  title: 'Todo App',
  ogTitle: 'My Amazing Site',
  description: 'A simple and efficient Todo App to manage your tasks',
  ogDescription: 'Manage your tasks efficiently with the Todo App.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})


</script>

<template>
  <div class="flex items-start justify-center h-[70vh] w-full">
    <div class="bg-blue-200 p-8 rounded-lg mt-8 w-full max-w-2xl">
      <h1 class="text-center mb-4">Add A todo Task here</h1>
      <div class="flex gap-2">
      
        <input
          type="text"
          class="flex-1 bg-white rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter item..."
          v-model="inputText"
        />
        <button 
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          @click="addItem"
        >
          Add
        </button>
      </div>
    </div>
  </div>

 



 

  


</template>

