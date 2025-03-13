<script setup lang="ts">
import WordCard from '@/components/WordCard.vue'
import { onMounted, ref } from 'vue';

const dict = ref([] as Word[])

function setShowTrans(idx: number, show: boolean) {
  dict.value[idx].showTrans = show
}

function setSelected(idx: number, selected: boolean) {
  dict.value[idx].selected = selected
  localStorage.setItem('dict', JSON.stringify(dict.value))
}

function toggleAll() {
  dict.value.forEach((word) => {
    word.selected = !word.selected
  })
  localStorage.setItem('dict', JSON.stringify(dict.value))
}

onMounted(() => {
  dict.value = (JSON.parse(localStorage.getItem('dict') || '[]') as Word[]).slice(0,100)
})
</script>


<template>
  <div class="flex justify-between items-center mb-6">
    <div class="flex gap-4 items-center ">
      <Button icon="pi pi-arrow-left" severity="secondary" rounded size="large" @click="$router.push('/')" />
      <div class="font-bold text-2xl">重新选择词库</div>
    </div>
    <div class="flex gap-4 items-center">
      <Button icon="pi pi-sync" label="反选本页全部" @click="toggleAll" />
      <Button icon="pi pi-file-export" label="导出定制词库"/>
    </div>

  </div>


  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <WordCard
      v-for="word in dict"
      :key="word.idx"
      :name="word.name"
      :idx="word.idx"
      :trans="word.trans"
      :selected="word.selected"
      :show-trans="word.showTrans"
      :anchor-pressed="word.anchorPressed"
      @hover="setShowTrans"
      @click="setSelected"
    />
  </div>

</template>
