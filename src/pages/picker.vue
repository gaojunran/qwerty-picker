<script setup lang="ts">
import WordCard from '@/components/WordCard.vue'
import { onMounted, ref } from 'vue';

const dict = ref([])

onMounted(() => {
  dict.value = JSON.parse(localStorage.getItem('dict') || '[]').slice(0,100)
})
</script>


<template>
  <div v-for="word in dict" :key="word.idx" class="block">
    <WordCard :name="word.name" :idx="word.idx"
    :trans="word.trans" :selected="word.selected"
    :show-trans="true" class="mb-4"
    />
  </div>

</template>
