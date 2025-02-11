<script setup>
import { ref } from 'vue'

const inputText = ref('')
const todoList = ref([])
const list = ref([])

onMounted(() => {
  console.log("Mounted");
  
})


 const getItem =()=>{
  const storedList = localStorage.getItem("todo")
  if (storedList) {
    list.value = JSON.parse(storedList)
    console.log("List updated", list.value);
    
  }
 }
 

const addItem = () => {
  todoList.value.push(inputText.value)
  localStorage.setItem("todo",JSON.stringify(todoList.value))
  inputText.value = ''
  getItem()

}
</script>

<template>
  <div class="flex items-start justify-center">
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
          @click="addItem"
        >
          Add
        </button>
      </div>
    </div>
  </div>
  <div class="flex items-start justify-center">
    <div >
      <ul>
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
    </div></div>

</template>

