<script setup>
import { ref } from 'vue'

import {task ,addItem } from "../composables/TodoTask"


</script>

<template>
  <div class="flex items-start justify-center">
    <div class="bg-gray-300 p-8 rounded-lg mt-8 w-full max-w-2xl">
      <div class="flex  gap-2">
        <input
          type="text"
          class="flex-1 bg-white rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter item..."
          v-model="task"
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

