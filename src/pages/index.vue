<script setup lang="ts">
import { Button, Textarea } from 'primevue';
import ConfirmDialog from 'primevue/confirmdialog';

import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const text = ref('');

const errorDialog = useConfirm();
const router = useRouter();

function openGithub() {
  window.open('https://github.com/gaojunran/qwerty-picker', '_blank')
}

function handleClick () {
  try {
    const json = JSON.parse(text.value);
    if (json.length === 0) {
      throw new Error("JSON format error");
    }
    json.forEach((item: Word, idx: number) => {
      if (!("name" in item && "trans" in item)) {
        throw new Error("JSON format error");
      }
      item.idx = idx;
      item.selected = true;
      item.showTrans = false;
      item.anchorPressed = false;
    });
    localStorage.setItem("dict", JSON.stringify(json));
    router.push({ path: "/picker" })
  } catch (err) {
    console.error(err);
    errorDialog.require({
      header: "您提供的JSON格式不正确！",
      message: "应为非空的JSON数组，每个对象包含name和trans字段。",
      icon: "pi pi-exclamation-triangle",
      rejectProps: {
        label: "重新输入",
        severity: "danger",
        icon: "pi pi-times",
        outlined: true
      },
      acceptProps: {
        class: "!hidden"
      },
      reject: () => {
        text.value = "";
      }
    })
  }
}
</script>


<template>
  <ConfirmDialog />
  <div class="w-full h-screen flex justify-center items-center">
    <div class="">
      <div class="flex gap-6 items-end">
        <h1 class="text-7xl font-bold gradient-text">Qwerty Picker</h1>
        <Button icon="pi pi-github" severity="secondary" class="" @click="openGithub"/>
      </div>

      <p class="text-4xl mt-4 mb-12 font-bold">定制你自己的<span class="text-purple-500">记忆词库</span></p>


      <div class="mb-4 font-bold">
        将JSON格式的词典粘贴到此处。
        <a
          href="https://github.com/RealKai42/qwerty-learner/tree/master/public/dicts"
          class="text-gray-300/50 hover:text-white transition underline underline-offset-4">来这里找词典
        </a>
        <p class="text-gray-300/50 mt-1 font-normal">如果内容过多导致浏览器卡顿，请使用Chrome浏览器并耐心等待。</p>
      </div>
      <Textarea v-model="text" rows="18" cols="80" />

      <Button
        label="去制作" icon="pi pi-sign-out" class="mt-4 !block w-full"
        :pt="{ icon: 'mr-2' }"
        @click="handleClick" :disabled="!text" />
    </div>
  </div>


</template>


<style lang="css">

.gradient-text {
    background: linear-gradient(to right, #9b59b6, #5f27cd);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

</style>
