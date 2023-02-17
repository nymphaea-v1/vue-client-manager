<template>
  <div class="form">
    <c-dropdown
      v-model:pickedIndex="pickedIndex"
      label="Выберите сущность:"
      :options="options"
      class="dropdown"
    />
    <c-button
      :disabled="pickedIndex === 0"
      class="button"
      @click="createEntity"
    >
      Создать
    </c-button>
  </div>
  <div class="list">
    <h2 class="list-header">
      Созданные сущности
    </h2>
    <div class="list-items">
      <div
        v-for="entity in createdEntities"
        :key="entity.id"
        class="entity"
      >
        <span class="entity-type">
          <b>type:</b> {{ entity.type }}
        </span>
        <span class="entity-id">
          <b>id:</b> {{ entity.id }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CButton from './components/c-button.vue'
import CDropdown from './components/c-dropdown.vue'

import { ref } from 'vue'
import { createLead } from './api/create-lead'
import { createContact } from './api/create-contact'
import { createCompany } from './api/create-company'

const options = ['Не выбрано', 'Сделка', 'Контакт', 'Компания']
const pickedIndex = ref(0)
const createdEntities = ref<Entity[]>([])

const createEntity = async () => {
  const entityType = options[pickedIndex.value]
  let created: Entity | null = null

  switch (entityType) {
    case 'Сделка': {
      created = await createLead()
      break
    }
    case 'Контакт': {
      created = await createContact()
      break
    }
    case 'Компания': {
      created = await createCompany()
      break
    }
  }

  if (created !== null) createdEntities.value.push(created)
}
</script>

<style scoped>
.form {
  width: max-content;
  margin: 0 auto 30px;
}

.dropdown {
  --dropdown-width: 350px;

  margin-right: 20px;
}

.list-header {
  margin-bottom: 4px;
}

.list-items {
  height: 400px;
  padding: 8px 20px;
  border: 1px solid rgb(0 0 0 / 10%);
  border-radius: 4px;
  overflow-y: auto;
}

.entity {
  height: 35px;
  padding: 4px;
}

.entity-type {
  display: inline-block;
  width: 130px;
  margin-right: 20px;
}
</style>
