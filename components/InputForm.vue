<script setup>
import { ref } from 'vue'
import { db } from '~/firebase'

import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc,
  doc,
  updateDoc 
} from 'firebase/firestore'
const loading = ref(false)
const inputText = ref('')
const todos = ref([])
const list = ref([])

onMounted(() => {
  console.log("Mounted");
  fetchTodos()
})
const fetchTodos = async () => {
    loading.value = true
    try {
      const querySnapshot = await getDocs(collection(db, 'todos'))
      console.log("querySnapshot", querySnapshot);
      
      list.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      loading.value = false
    }
  }


//  const getItem =()=>{
//   const storedList = localStorage.getItem("todo")
//   if (storedList) {
//     list.value = JSON.parse(storedList)
//     console.log("List updated", list.value);
    
//   }
//  }

 
 const addItem = async (todoText) => {
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        text: inputText.value,
        completed: false,
        createdAt: new Date()
      })
      // Refresh the list
      await fetchTodos()
      return docRef
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

// const addItem = () => {
//   todoList.value.push(inputText.value)
//   localStorage.setItem("todo",JSON.stringify(todoList.value))
//   inputText.value = ''
//   getItem()

// }
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
        <li v-for="item in list" :key="item"> {{  }} {{ item.text }}</li>
      </ul>
    </div></div>

</template>

