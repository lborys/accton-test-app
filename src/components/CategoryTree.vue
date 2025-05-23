<template>
  <div class="category-tree">
    <input
      type="text"
      v-model="search"
      placeholder="Search..."
      class="search-input"
    />

    <div class="selected-tags">
      <div
        v-for="id in selected"
        :key="id"
        class="tag"
      >
        {{ flatNodeMap[id]?.name || 'Unknown' }}
        <button @click="remove(id)">×</button>
      </div>
    </div>

    <div class="tree-container">
      <TreeNode
        v-for="node in filteredData"
        :key="node.id"
        :node="node"
        :selected="selected"
        @toggle="handleToggle"
      />
    </div>

    <pre v-if="formattedOutput.length" class="output-json">
      {{ formattedOutput }}
    </pre>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TreeNode from './TreeNode.vue'

const props = defineProps({
  data: Array
})

const search = ref('')
const selected = ref([])
const flatNodeMap = ref({})

const buildFlatNodeMap = (nodes) => {
  for (const node of nodes) {
    flatNodeMap.value[node.id] = node
    if (node.children?.length) {
      buildFlatNodeMap(node.children)
    }
  }
}

onMounted(() => buildFlatNodeMap(props.data))

const filteredData = computed(() => {
  if (!search.value.trim()) return props.data

  const matches = (node) => {
    if (node.name.toLowerCase().includes(search.value.toLowerCase())) return true
    return node.children?.some(matches)
  }

  const filter = (node) => {
    if (node.name.toLowerCase().includes(search.value.toLowerCase())) return node
    const filteredChildren = node.children?.map(filter).filter(Boolean) || []
    if (filteredChildren.length > 0) {
      return { ...node, children: filteredChildren }
    }
    return null
  }

  return props.data
    .filter(matches)
    .map(filter)
    .filter(Boolean)
})

const handleToggle = (id, childrenIds, isChecked) => {
  if (isChecked) {
    selected.value = Array.from(new Set([...selected.value, id, ...childrenIds]))
  } else {
    selected.value = selected.value.filter(
      (s) => s !== id && !childrenIds.includes(s)
    )
  }
}

const remove = (id) => {
  selected.value = selected.value.filter((s) => s !== id)
}

const formattedOutput = computed(() => {
  if (selected.value.length) {
    return JSON.stringify(
      {
        categories: selected.value
      },
      null,
      2
    )
  } else {
    return []
  }
  
})
</script>

<style scoped>
.category-tree {
  font-family: sans-serif;
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40px; /* фіксована висота */
  box-sizing: border-box;
  /* Приберемо вертикальне центрування */
  line-height: normal;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 36px; /* фіксована мінімальна висота */
  align-items: flex-start;
  /* Приберемо вертикальне центрування */
}

.tag {
  background: #f0f0f0;
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 28px; /* фіксована висота */
}

.tag button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}

.tree-container {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
  min-height: 100px;
  /* зафіксувати ширину, щоб не "стрибає" */
  width: 100%;
}

.output-json {
  margin-top: 8px;
  background: #f9f9f9;
  padding: 12px;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  min-height: 80px;
}
</style>

