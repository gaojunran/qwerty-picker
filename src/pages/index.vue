<script setup lang="ts">
import { outlined } from '@primeuix/themes/aura/message';
import { label } from '@primeuix/themes/aura/metergroup';
import { Button, Textarea } from 'primevue';
import ConfirmDialog from 'primevue/confirmdialog';

import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const text = ref('');

const errorDialog = useConfirm();
const router = useRouter();

function handleClick () {
  try {
    const json = JSON.parse(text.value);
    if (json.length === 0) {
      throw new Error("JSON format error");
    }
    json.forEach((item, idx: number) => {
      if (!("name" in item && "trans" in item)) {
        throw new Error("JSON format error");
      }
      item.idx = idx;
      item.selected = true;
      item.showTrans = false;
      item.anchorPressed = false;
    });
    localStorage.setItem("dict", JSON.stringify(json));
    router.push("/picker")
  } catch (e) {
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
  <div class="w-full min-h-screen flex justify-center items-center">
    <div class="">
    <div class="mb-6">
      将JSON格式的词典粘贴到此处。
      <a
        href="https://github.com/RealKai42/qwerty-learner/tree/master/public/dicts"
        class="text-gray-300/50 hover:text-white transition">来这里找词典</a>
    </div>
    <Textarea v-model="text" rows="10" cols="50" />

    <Button
      label="去制作" icon="pi pi-sign-out" class="mt-4 !block w-full"
      :pt="{ icon: 'mr-2' }"
      @click="handleClick" :disabled="!text" />
    <RouterView />
  </div>
  </div>


</template>
