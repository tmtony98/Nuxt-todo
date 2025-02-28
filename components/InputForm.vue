<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import Listview from '~/components/Listview.vue'

definePageMeta({
  layout: 'custom'
})
const loading = ref(false)
const inputText = ref('')
const todos = ref([])






const addItem= async ()=>{
  const response = await axios.post("http://localhost:5000/todo",{todo:inputText.value})
  console.log(response.data);  

   inputText.value = ""

}
 


useSeoMeta({
  title: 'Todo App',
  ogTitle: 'My Amazing Site',
  description: 'This is Todo App.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
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

