<script setup lang="ts">
const props = defineProps<{
  idx: number,
  name: string,
  trans: string[],
  selected: boolean,
  showTrans: boolean
}>()

defineEmits()

</script>

<template>
  <div class="border-2 border-white/50 group rounded-md p-4 cursor-pointer max-w-1/3" :class="{'bg-green-500/10': props.selected}">
    <div class="text-2xl">
      {{ props.name }}
    </div>
    <div v-if="props.showTrans" class="text-sm visible-collapse group-hover:visible">
      {{ props.trans.join(', ') }}
    </div>
  </div>
</template>