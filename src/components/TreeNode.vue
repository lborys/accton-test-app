<template>
  <div class="tree-node">
    <label class="tree-node-label">
      <input
        type="checkbox"
        :checked="isSelected(node.id)"
        @change="toggle"
      />
      <slot :node="node" :isSelected="isSelected(node.id)">
        {{ node.name }}
      </slot>
    </label>
    <div v-if="node.children && node.children.length" class="tree-node-children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :selected="selected"
        @toggle="handleToggle"
      >
        <template #default="slotProps">
          <slot :node="slotProps.node" :isSelected="slotProps.isSelected">
            {{ slotProps.node.name }}
          </slot>
        </template>
      </TreeNode>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  node: Object,
  selected: Array
})

const emit = defineEmits(['toggle'])

const isSelected = (id) => props.selected.includes(id)

const collectChildrenIds = (node) => {
  let ids = []
  for (const child of node.children || []) {
    ids.push(child.id, ...collectChildrenIds(child))
  }
  return ids
}

const toggle = (event) => {
  const selected = event.target.checked
  const childrenIds = collectChildrenIds(props.node)
  emit('toggle', props.node.id, childrenIds, selected)
}

const handleToggle = (id, childrenIds, selected) => {
  emit('toggle', id, childrenIds, selected)
}
</script>

<style scoped>
.tree-node {
  margin-left: 1rem;
  margin-bottom: 0.25rem;
  padding-left: 0.5rem;
  border-left: 2px dashed #ddd;
}

.tree-node-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.tree-node-children .tree-node-label {
  font-weight: normal;
  color: #555;
}
</style>
