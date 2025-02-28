<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Todo {
  id: number | string
  todo: string
}

const list = ref<Todo[]>([])
const loading = ref(false)


// Fetch todos using useFetch
const fetchTodos = async () => {
  const { data: todo , error, refresh: refershData  } = await useFetch<Todo[]>('http://localhost:5000/todo')
  if (error.value) {
    console.error('Error fetching todos:', error.value)
    return
  }
  if (todo.value) {
    list.value = todo.value
  }
}

// Add todo using useFetch


// Delete todo using useFetch
const deleteTodo = async (id: number | string) => {
  loading.value = true
  const { error } = await useFetch(`http://localhost:5000/todo/${id}`, {
    method: 'DELETE'
  })
  
  if (error.value) {
    console.error('Error deleting todo:', error.value)
  } else {
    useToastify("Todo deleted !", {
    autoClose: 1000,
    position: ToastifyOption.POSITION.TOP_RIGHT,

  });
    await fetchTodos()
  }
  loading.value = false
}

onMounted(() => {
  setTimeout(() => {
    fetchTodos()
  }, 100);
  
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Input Section -->
      <!-- <div class="bg-blue-200 p-8 rounded-lg mb-8">
        <div class="flex gap-2">
          <input
            type="text"
            class="flex-1 bg-white rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter item..."
            v-model="inputText"
            @keyup.enter="addItem"
          />
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
            @click="addItem"
            :disabled="loading || !inputText.trim()"
          >
            {{ loading ? 'Adding...' : 'Add' }}
          </button>
        </div>
      </div> -->

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-4">
        <p class="text-gray-600">Loading...</p>
      </div>

      <!-- Todo List -->
      <ul v-else class="space-y-3">
        <li
          v-for="(item, index) in list"
          :key="item.id"
          class="bg-blue-100 rounded-lg p-3 flex items-center justify-between hover:bg-blue-200 transition-colors duration-200"
        >
          <span class="text-gray-800 font-medium">{{ index + 1 }}. {{ item.todo }}</span>
          <div class="flex gap-2">
            <NuxtLink
              :to="{ name: 'edit-id', params: { id: item.id } }"
              class="bg-white px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 shadow-sm"
            >
              Edit
            </NuxtLink>
            <button
              @click="deleteTodo(item.id)"
              class="bg-white px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 shadow-sm"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>

      <!-- Empty State -->
      <div v-if="!loading && list.length === 0" class="text-center py-4">
        <p class="text-gray-600">No todos yet. Add one above!</p>
      </div>
    </div>
  </div>
</template>