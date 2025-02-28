<script setup lang="ts">
import { navigateTo } from '#app'
import axios from 'axios'
import { ref } from 'vue';

const route = useRoute()
const id = route.params.id
const inputText = ref<string> ('')

interface Todo {
  id: number | string
  todo: string
}

definePageMeta({
  layout: 'custom'
})
onMounted(() => {
  console.log("id",id);
  fetchTodos()
  
})
   



const fetchTodos = async () => {
  const { data: todo , error, refresh: refershData  } =  await useFetch<any>(`http://localhost:5000/todo/${id}`)
  if (error.value) {
    console.error('Error fetching todos:', error.value)
    return
  }
  if (todo.value) {
    inputText.value = todo.value.todo 
      
  }
}  
   
                                                                   


const updateTodo = async () => {
  const { data, error } = await useFetch<any>(`http://localhost:5000/todo/${id}`, {
    method: 'PUT',
    body: { todo: inputText.value },
  })

  if (error.value) {
    console.error('Error updating todo:', error.value)
    return
  }
  console.log(data.value)
  useToastify("Todo Updated successfully !", {
    autoClose: 1500,
    position: ToastifyOption.POSITION.TOP_RIGHT,
  })
  navigateTo("/listtodo")
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



