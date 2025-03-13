<script setup lang="ts">
const props = defineProps<{
  idx: number
  name: string
  trans: string[]
  selected: boolean
  showTrans: boolean
  anchorPressed: boolean
}>()

const emit = defineEmits<{
  hover: [idx: number, show: boolean]
  click: [idx: number, selected: boolean]
  anchor: [idx: number, pressed: boolean]
}>()
</script>

<template>
  <div
    class="border-2 border-white/50 group rounded-md p-4 cursor-pointer h-32 flex flex-col justify-center relative"
    :class="{
      'bg-blue-500/10': props.anchorPressed,
      'bg-purple-500/30': props.selected && !props.anchorPressed,
      'p-2 ': props.showTrans,
      'p-6 ': !props.showTrans,
    }"
    @mouseover.stop="emit('hover', props.idx, true);"
    @mouseleave.stop="emit('hover', props.idx, false);"
    @click.left="emit('click', props.idx, !props.selected)"
    @click.right.prevent="emit('anchor', props.idx, !props.anchorPressed)"
  >
    <div class="absolute right-2 top-2 text-white/50 font-mono">
      {{ props.idx }}
    </div>
    <div
      :class="{
        'text-xl': props.showTrans,
        'text-3xl': !props.showTrans,
      }"
      class="transition-all font-mono"
    >
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
