<template>
  <CategoryTree :data="categoryData" @update:selected="onSelected" />
</template>

<script setup>
import { ref } from 'vue'
import CategoryTree from './components/CategoryTree.vue'
import categoryData from './store/CategoryListStore'

const selected = ref([])

const onSelected = (val) => {
  selected.value = val.categories
}
</script>
