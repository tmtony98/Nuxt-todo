<script setup>
import { navigateTo } from '#app'
import axios from 'axios'
import { ref } from 'vue';

const route = useRoute()
const id = route.params.id
const inputText = ref('')

definePageMeta({
  layout: 'drwerlayout'
})
onMounted(() => {
  console.log("id",id);
  fetchTodos()
  
})
   
const fetchTodos= async ()=>{
    const response = await axios.get(`http://localhost:5000/todo/${id}`)
    console.log(response.data);  
    inputText.value = response.data.todo
}

const updateTodo = async ()=>{
    const response = await axios.put(`http://localhost:5000/todo/${id}`,{todo:inputText.value})
    console.log(response.data);  
    fetchTodos()
    navigateTo("/")
}
useSeoMeta({
  title: 'Todo Edit Page',
  ogTitle: 'Todo Edit Page',
  description: 'Todo Edit Page.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

</script>

<template>
     <div class="flex items-start h-[70vh] justify-center">
    <div class="bg-gray-300 p-8 rounded-lg mt-8 w-full max-w-2xl">
      <div class="flex  gap-2">
        <input
          type="text"
          class="flex-1 bg-white rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter item..."
          v-model="inputText"
        />
        <button 
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          @click="updateTodo"
        >
       Update
        </button>
      </div>
    </div>
  </div>
</template>



