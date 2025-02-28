<script setup lang="ts">
import InputForm from '~/components/InputForm.vue';
import Todoform from './todoform.vue';
import Listview from '~/components/Listview.vue';

definePageMeta({
  layout: 'custom',
})
</script>

<template>
    <div>
 <InputForm/>
 <!-- <Listview/> -->
     
    </div>
  </template>