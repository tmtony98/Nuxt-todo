import { ref, onMounted, onUnmounted } from 'vue'



export default function TodoTask() {
    const task = ref('')
    const tasks = ref([])
    
    const addTask = () => {
        if (task.value) {
        tasks.value.push(task.value)
        localStorage.setItem("todo",JSON.stringify(tasks.value))
        task.value = ''
        }
    }
    
    // const removeTask = (index) => {
    //     tasks.value.splice(index, 1)
    // }
    
    onMounted(() => {
        console.log('mounted')
    })
    
    onUnmounted(() => {
        console.log('unmounted')
    })
    
    return {
        task,
        tasks,
        addTask,
       
    }
}

// export default function getTodoTask() {
    
//     const storedList = localStorage.getItem("todo")
//     if (storedList) {
//         tasks.value = JSON.parse(storedList)
//     }
//     return {
//         task,
//         tasks,
//         addTask,
//         removeTask
//     }
// }