<script setup>
import axios from 'axios'
import { ref } from 'vue'

definePageMeta({
  layout: 'custom'
})
const loading = ref(false)
const inputText = ref('')
const todos = ref([])
const list = ref([])

onMounted(() => {
  console.log("Mounted");
  fetchTodos()
  
  // fetchTodos()
})

const fetchTodos= async ()=>{
  const response = await axios.get("http://localhost:5000/todo")
  console.log(response.data);  
  list.value = response.data

}

const addItem= async ()=>{
  const response = await axios.post("http://localhost:5000/todo",{todo:inputText.value})
  console.log(response.data);  

  fetchTodos()
   inputText.value = ""

}
 
const deleteTodo = async (id)=>{
  const response = await axios.delete(`http://localhost:5000/todo/${id}`)
  console.log(response.data);  
  fetchTodos()
}

useSeoMeta({
  title: 'Todo App',
  ogTitle: 'My Amazing Site',
  description: 'This is mTodo App.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})


</script>

<template>
  <div class="flex items-start justify-center">
    <div class="bg-blue-200 p-8 rounded-lg mt-8 w-full max-w-2xl">
      <div class="flex  gap-2">
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


<div class="container flex justify-center mt-5">
  <div class="grid w-1/3 gap-1">
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <ul className="space-y-3">
          <li v-for="(item,index) in list" key="item.index" className="bg-blue-100 rounded-lg p-3 mb-4 flex items-center justify-between hover:bg-blue-200 transition-colors duration-200">
            <span className="text-gray-800 font-medium">{{  index +1 }}.{{item.todo }}</span>
            <div className="flex gap-2">
             <NuxtLink :to="{ name: 'edit-id', params: { id: item.id } }"><button  className="bg-white px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 shadow-sm">
                edit
              </button>
            </NuxtLink> 
              <button @click="deleteTodo(item.id)" className="bg-white px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 shadow-sm">
               delete
              </button>
            </div>
          </li>

          
        </ul>
      </div>
    </div>

  </div>
</div>
 

  


</template>

