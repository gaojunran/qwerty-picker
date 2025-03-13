<script setup lang="ts">
import WordCard from '@/components/WordCard.vue'
import Paginator from 'primevue/paginator';
import { onMounted, ref, watch } from 'vue';

const records = ref([] as Word[])
const dict = ref([] as Word[])

const first = ref(0)
const size = ref(100)

watch([first, size], ([newFirst, newSize], [oldFirst, oldSize]) => {
  records.value.splice(oldFirst, oldSize, ...dict.value)
  localStorage.setItem('dict', JSON.stringify(records.value))
  dict.value = records.value.slice(newFirst, newFirst + newSize)
})

// 按下空格翻页，注册回调
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault()
    first.value += size.value
  }
})

function setShowTrans(idx: number, show: boolean) {
  dict.value[idx - first.value].showTrans = show
}

function setSelected(idx: number, selected: boolean) {
  dict.value[idx - first.value].selected = selected
}

function toggleAll() {
  dict.value.forEach((word) => {
    word.selected = !word.selected
  })
}

function setAnchor(idx: number, pressed: boolean) {
  if (dict.value.filter(word => word.anchorPressed).length === 1) {
    const formerIdx = dict.value.findIndex(word => word.anchorPressed)
    const currIdx = idx - first.value
    const [start, end] = formerIdx < currIdx ? [formerIdx, currIdx] : [currIdx, formerIdx]
    for (let i = start; i <= end; i++) {
      dict.value[i].selected = !dict.value[i].selected
    }
    dict.value[start].anchorPressed = false
  } else {
    dict.value[idx - first.value].anchorPressed = pressed
  }
}

function downloadJson() {
  // ai generated
  const list = records.value.filter(word => word.selected)
  const dataStr = JSON.stringify(list, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `custom-dict-${list.length}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

onMounted(() => {
  records.value = (JSON.parse(localStorage.getItem('dict') || '[]') as Word[])
  dict.value = records.value.slice(first.value, first.value + size.value)
})
</script>


<template>
  <div class="p-20 min-h-screen">
    <div class="flex justify-between items-center mb-8">
      <div class="flex gap-4 items-center ">
        <Button icon="pi pi-arrow-left" severity="secondary" rounded size="large" @click="$router.push('/')" />
        <div class="font-bold text-2xl">重新选择词库</div>
      </div>
      <div class="text-white/50">
        累计已选择
        <span class="text-white font-mono">{{ records.filter(word => word.selected).length }}</span>
        个单词，筛去
        <span class="text-white font-mono">{{ records.filter(word => !word.selected).length }}</span>
        个单词
      </div>
      <div class="flex gap-4 items-center">
        <Button icon="pi pi-sync" label="反选本页全部" severity="secondary" @click="toggleAll" />
        <Button icon="pi pi-file-export" label="导出定制词库" @click="downloadJson"/>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
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
        @anchor="setAnchor"
      />
    </div>

    <Paginator
      :total-records="records.length"
      :rows-per-page-options="[20, 25, 30, 50, 100]"
      v-model:first="first"
      v-model:rows="size"
      class="mb-12"
    />
  </div>


</template>
