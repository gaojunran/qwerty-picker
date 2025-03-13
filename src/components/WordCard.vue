<script setup lang="ts">
const props = defineProps<{
  idx: number,
  name: string,
  trans: string[],
  selected: boolean,
  showTrans: boolean
  anchorPressed: boolean
}>()

const emit = defineEmits<{
  hover: [idx: number, show: boolean],
  click: [idx: number, selected: boolean],
  anchor: [idx: number, pressed: boolean]
}>()

</script>

<template>
  <div
    class="border-2 border-white/50 group rounded-md p-4 cursor-pointer h-32 flex flex-col justify-center relative"
    :class="{
      'bg-green-500/10': props.selected,
      'bg-blue-500/10': props.anchorPressed,
      'p-2 ': props.showTrans,
      'p-6 ': !props.showTrans
    }"
    @mouseover.stop="emit('hover', props.idx, true);"
    @mouseleave.stop="emit('hover', props.idx, false);"
    @click="emit('click', props.idx, !props.selected)"
  >
    <i
      class="pi pi-asterisk right-1 bottom-1 absolute z-100 scale-80"
      :class="{
        'text-white': props.anchorPressed,
        'text-white/50': !props.anchorPressed
      }"
      @click="emit('anchor', props.idx, !props.anchorPressed)"
    />
    <div
      :class="{
        'text-2xl': props.showTrans,
        'text-4xl': !props.showTrans
      }"
      class="transition-all font-mono">
      {{ props.name }}
    </div>
    <Transition>
      <div v-if="props.showTrans" class="text-sm line-clamp-3">
      {{ props.trans.join(', ') }}
    </div>
    </Transition>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
