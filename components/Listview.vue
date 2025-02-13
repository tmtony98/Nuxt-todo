
<script setup lang="ts">
import axios from 'axios'

 interface Todo {
  id: number | string;
  todo: string;}

const list = ref<Todo[]>([])
const CountList = ref<Count[]>([])
const count = ref<Count>()

  const { data } = await useFetch<Count[]>('http://localhost:5000/todo')
  if (data.value) {
    CountList.value = data.value
  }

  interface Count{
    id:number | string;
    todo: string;
  }



    const deleteTodo = async (id:number| string)=>{
  const response = await axios.delete(`http://localhost:5000/todo/${id}`)
  console.log(response.data);  
  fetchTodos()
}

const fetchTodos= async ()=>{
  const response = await axios.get("http://localhost:5000/todo")
 // console.log(response.data);  
  list.value = response.data


}
onMounted(() => {
  console.log("Mounted", CountList.value);
  fetchTodos()
  
  // fetchTodos()
})

</script>


<template>
    <div>
        <div class="container flex justify-center mt-5">
  <div class="grid w-1/3 gap-1">
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <ul className="space-y-3">
          <li v-for="(item,index) in CountList" key="item.index" className="bg-blue-100 rounded-lg p-3 mb-4 flex items-center justify-between hover:bg-blue-200 transition-colors duration-200">
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
    </div>
</template>


<style scoped>

</style>