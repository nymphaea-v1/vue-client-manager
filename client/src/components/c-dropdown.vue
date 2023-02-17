<template>
  <div class="dropdown">
    <span class="dropdown-label">
      {{ label }}
    </span>
    <div
      class="dropdown-header"
      @click="openDropdown"
    >
      {{ options[pickedIndex] }}
    </div>
    <div
      v-if="isOpened"
      class="dropdown-body"
    >
      <div
        v-for="(item, index) in options"
        :key="index"
        class="dropdown-item"
        @click="pickItem(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label: string
  options: any[]
  pickedIndex?: number
}

withDefaults(defineProps<Props>(), {
  pickedIndex: 0
})

const emits = defineEmits<{ (e: 'update:pickedIndex', pickedIndex: number): void }>()

const isOpened = ref(false)

const openDropdown = () => isOpened.value = true
const closeDropdown = () => isOpened.value = false

const pickItem = (index: number) => {
  emits('update:pickedIndex', index)
  closeDropdown()
}
</script>

<style scoped>
.dropdown {
  --dropdown-height: 35px;
  --dropdown-width: 200px;

  position: relative;

  display: inline-block;
  width: max-content;

  line-height: calc(var(--dropdown-height) - 2px);
}

.dropdown-label {
  margin-right: 12px;
}

.dropdown-header {
  position: relative;

  display: inline-block;
  width: var(--dropdown-width);
  height: var(--dropdown-height);
  padding: 0 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;

  background-color: #ffffff;
}

.dropdown-header::before,
.dropdown-header::after {
  position: absolute;
  right: 10px;

  display: block;
  width: 8px;
  height: 2px;

  background-color: var(--color-border);

  content: "";
}

.dropdown-header::before {
  top: 50%;

  transform: translateX(-60%) rotate(45deg);
}

.dropdown-header::after {
  top: 50%;

  transform: rotate(-45deg);
}

.dropdown-header:last-child:hover {
  cursor: pointer;
  filter: brightness(90%);
}

.dropdown-body {
  position: absolute;
  top: 110%;
  right: 0;

  width: var(--dropdown-width);
  border: 1px solid var(--color-border);
  border-radius: 4px;

  background-color: #ffffff;
}

.dropdown-item {
  height: var(--dropdown-height);
  padding: 0 10px;
}

.dropdown-item:hover {
  background-color: var(--color-border);
  cursor: pointer;
}
</style>
