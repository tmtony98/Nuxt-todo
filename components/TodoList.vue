<script setup>

const list = ref([])

onMounted(() => {
  const storedList = localStorage.getItem("todo")
  if (storedList) {
    list.value = JSON.parse(storedList)
  }
})

watch(list, (newList) => {
 console.log("List updated", newList);
 
})
</script>

<template>
 <ul>
    <li v-for="item in list" :key="item">{{ item }}</li>
  </ul>

</template>