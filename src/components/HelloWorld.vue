<template>
  <main class="content">
    <div>{{ AuthorName }}</div>
    <h1>Ласкаво просимо на сторінку</h1>
    <p>
      Це основна частина сторінки, де розміщується контент. Тут немає меню, лише інформація для користувача.
    </p>

    <h2>Підзаголовок 1</h2>
    <p>
      Цей розділ містить додаткову інформацію, яку можна розмістити на сторінці. Ви можете додавати сюди будь-які компоненти або блоки.
    </p>

    <h2>Підзаголовок 2</h2>
    <p>
      Ще один блок контенту для демонстрації того, як виглядає структура. Розмітка є адаптивною і простою.
    </p>

    <h2>Підзаголовок 3</h2>
    <p>
      Тут можна додати таблиці, списки, зображення, форми чи будь-які інші елементи інтерфейсу.
    </p>
    <input type="text" v-model="inputName">
    <button @click="ChangeName(inputName)">Change name</button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const AuthorName = ref('Borys')
const inputName = ref('')

const ChangeName = (name: any) => {
  AuthorName.value = name
  inputName.value = ''
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.read-the-docs {
  color: #888;
}
</style>
